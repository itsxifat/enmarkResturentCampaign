// Central contact details, used across the site.
export const CONTACT_EMAIL = 'enmark@enfinito.com'
export const CONTACT_EMAIL_URL = `mailto:${CONTACT_EMAIL}`

export const WHATSAPP_DISPLAY = '+880 1332-818903'

// wa.me needs the number in international format: no +, spaces or dashes.
const WHATSAPP_NUMBER = '8801332818903'
const WHATSAPP_TEXT =
  "Hi enmark, I'd like to know more about your restaurant marketing plans."

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT,
)}`
