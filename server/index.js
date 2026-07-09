import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import nodemailer from 'nodemailer'

const {
  SMTP_HOST,
  SMTP_PORT = '587',
  SMTP_SECURE = 'false',
  SMTP_USER,
  SMTP_PASS,
  MAIL_TO,
  MAIL_FROM,
  PORT = '3015',
} = process.env

const useSSL = SMTP_SECURE === 'true'

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: useSSL, // false = STARTTLS on 587 (no implicit SSL)
  // The server requires an encrypted, authenticated session to relay
  // externally, so enforce STARTTLS when not using implicit SSL.
  requireTLS: !useSSL,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  // Shared mail hosts often use self-signed certs; don't reject them.
  tls: { rejectUnauthorized: false },
})

const esc = (s = '') =>
  String(s).replace(
    /[<>&]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c],
  )

// Brand palette
const INK = '#111111'
const GREEN = '#9FE870'
const GREEN_DARK = '#3F8F2E'
const GREEN_SOFT = '#EAF7DE'
const CREAM = '#F6F5F0'
const BORDER = '#E6E3DB'
const MUTED = '#737373'

function buildEmail({ name, restaurant, email, phone, city, pkg, notes, photo }) {
  const row = (label, value, opts = {}) => {
    if (!value) value = '—'
    const val = opts.raw ? value : esc(value)
    return `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid ${CREAM};font-size:12px;color:${MUTED};width:130px;vertical-align:top;font-family:Helvetica,Arial,sans-serif;">${label}</td>
        <td style="padding:12px 0;border-bottom:1px solid ${CREAM};font-size:14px;color:${INK};vertical-align:top;font-family:Helvetica,Arial,sans-serif;">${val}</td>
      </tr>`
  }

  const pkgPill = pkg
    ? `<span style="display:inline-block;background:${GREEN_SOFT};color:${GREEN_DARK};font-size:12px;font-weight:600;padding:4px 12px;border-radius:100px;text-transform:capitalize;">${esc(pkg)}</span>`
    : '—'

  const photoLine = photo
    ? `<span style="color:${GREEN_DARK};font-weight:600;">✓ Attached</span> &nbsp;<span style="color:${MUTED};">${esc(photo)}</span>`
    : 'No photo'

  const html = `
  <div style="background:${CREAM};padding:32px 16px;margin:0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#ffffff;border:1px solid ${BORDER};border-radius:16px;border-collapse:separate;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:${INK};padding:22px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;letter-spacing:-0.5px;color:${GREEN};">enmark</td>
                  <td align="right" style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8a8a8a;">New application</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 6px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${GREEN_DARK};font-weight:600;">New restaurant lead</p>
              <h1 style="margin:0 0 24px;font-family:Helvetica,Arial,sans-serif;font-size:24px;line-height:1.2;color:${INK};font-weight:600;">${esc(restaurant || name || 'Restaurant application')}</h1>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${row('Contact', name)}
                ${row('Restaurant', restaurant)}
                ${row('Email', email)}
                ${row('Phone', phone)}
                ${row('City', city)}
                ${row('Package', pkgPill, { raw: true })}
                ${row('Photo', photoLine, { raw: true })}
                ${row('Notes', notes)}
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:18px 32px;border-top:1px solid ${BORDER};background:#fbfbf9;">
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#a3a3a3;">Sent automatically from the enmark application form.</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </div>`

  const text = [
    'NEW ENMARK APPLICATION',
    '',
    `Contact:    ${name || '—'}`,
    `Restaurant: ${restaurant || '—'}`,
    `Email:      ${email || '—'}`,
    `Phone:      ${phone || '—'}`,
    `City:       ${city || '—'}`,
    `Package:    ${pkg || '—'}`,
    `Photo:      ${photo ? `Attached (${photo})` : 'No photo'}`,
    `Notes:      ${notes || '—'}`,
  ].join('\n')

  return { html, text }
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
})

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/apply', upload.single('photo'), async (req, res) => {
  const b = req.body || {}
  const photoName = req.file ? req.file.originalname : ''

  const { html, text } = buildEmail({
    name: b.name,
    restaurant: b.restaurant,
    email: b.email,
    phone: b.phone,
    city: b.city,
    pkg: b.package,
    notes: b.notes,
    photo: photoName,
  })

  try {
    await transporter.sendMail({
      from: `enmark applications <${MAIL_FROM}>`,
      to: MAIL_TO, // comma-separated list is accepted
      replyTo: b.email || undefined,
      subject: `New application — ${b.restaurant || b.name || 'restaurant'}`,
      text,
      html,
      attachments: req.file
        ? [{ filename: req.file.originalname, content: req.file.buffer }]
        : [],
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Mail send failed:', err.message)
    res.status(500).json({ ok: false, error: 'send_failed' })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(Number(PORT), () => {
  console.log(`Mail server listening on http://localhost:${PORT}`)
})
