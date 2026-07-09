// Full feature matrix from the Enfinito Restaurant Growth Packages sheet.
// Each row's `values` array is ordered [Starter, Popular, Signature].
// true = included, false = not included, string = specific value.
export const COMPARISON = [
  {
    category: 'Creative production',
    rows: [
      { label: 'Production day', values: ['Every 3 months', 'Every 2 months', 'Every month'] },
      { label: 'Reels / month', values: ['4', '8', '12'] },
      { label: 'Static posts / month', values: ['8', '16', '24'] },
      { label: 'Food photography', values: ['Up to 10 items', 'Up to 20 items', 'Full menu'] },
      { label: 'Interior & ambience photography', values: [true, true, true] },
      { label: 'Kitchen behind-the-scenes', values: [true, true, true] },
      { label: 'Team & chef photography', values: [true, true, true] },
      { label: 'Seasonal content production', values: [true, true, true] },
      { label: 'Professional editing & color grading', values: [true, true, true] },
    ],
  },
  {
    category: 'Digital presence management',
    rows: [
      { label: 'Facebook page management', values: [true, true, true] },
      { label: 'Instagram management', values: [true, true, true] },
      { label: 'Google business profile', values: ['Basic', 'Advanced', 'Advanced'] },
      { label: 'TikTok management', values: [false, 'Basic', 'Full'] },
      { label: 'Content scheduling', values: [true, true, true] },
      { label: 'Caption copywriting', values: [true, true, true] },
      { label: 'Hashtag research', values: [true, true, true] },
      { label: 'Monthly content calendar', values: [true, true, true] },
    ],
  },
  {
    category: 'Marketing strategy',
    rows: [
      { label: 'Restaurant marketing strategy', values: [true, true, true] },
      { label: 'Restaurant audit', values: ['Initial', 'Quarterly', 'Monthly'] },
      { label: 'Competitor analysis', values: ['Quarterly', 'Monthly', 'Bi-weekly'] },
      { label: 'Festival campaign planning', values: [false, true, true] },
      { label: 'Offer strategy', values: [false, 'Bi-monthly', 'Monthly'] },
      { label: 'Customer retention recommendations', values: [true, true, true] },
      { label: 'Brand positioning consultation', values: [false, true, true] },
    ],
  },
  {
    category: 'Digital advertising & PR',
    rows: [
      { label: 'Meta ads management', values: [true, true, true] },
      { label: 'Campaign optimization', values: ['Basic', 'Advanced', 'Advanced'] },
      { label: 'Remarketing campaign', values: [false, true, true] },
      { label: 'Pixel & conversion tracking', values: [false, true, true] },
      { label: 'PR & influencer coordination', values: ['1 / month', 'Up to 2 / month', 'Up to 5 / month'] },
    ],
  },
  {
    category: 'Performance & support',
    rows: [
      { label: 'Performance report', values: ['Monthly', 'Monthly', 'Weekly dashboard'] },
      { label: 'Strategy meeting', values: ['Monthly', 'Monthly', 'Weekly'] },
      { label: 'Content performance analysis', values: [true, true, true] },
      { label: 'Marketing recommendations', values: [true, true, true] },
      { label: 'Dedicated account manager', values: ['Shared', 'Dedicated', 'Priority'] },
      { label: 'WhatsApp support', values: [true, true, 'Priority'] },
      { label: 'Creative turnaround time', values: ['Within 72 hours', 'Within 48 hours', 'Within 24 hours'] },
    ],
  },
]

export const EVERY_PACKAGE_INCLUDES = [
  'Restaurant marketing strategy',
  'Monthly content calendar',
  'Professional caption copywriting',
  'Hashtag research',
  'Content scheduling',
  'Professional editing & color grading',
  'Trend research',
  'Competitor monitoring',
  'Monthly performance review',
  'Dedicated client communication',
]

export const TERMS = [
  'Minimum contract duration is 6 months.',
  'During an active contract, the plan and its duration cannot be downgraded. You may upgrade to a higher plan or extend the duration at any time; switching to a lower plan or a shorter term is only possible once the current contract ends and a new contract begins.',
  'Monthly payments must be made in advance.',
  'Advertising budgets are not included.',
  'Influencer remuneration, model fees, location charges, food styling props, premium equipment and third-party service charges are billed separately.',
  'Additional production days or deliverables beyond the package scope will incur additional charges.',
  'One revision is included for each design and video deliverable.',
  'Approved content is delivered gradually according to your content calendar — edited photos, videos, and posts are released on their scheduled dates, not handed over all at once.',
  'Content approvals should be provided within 48 hours.',
  'Raw footage and editable source files are not included unless separately agreed.',
]
