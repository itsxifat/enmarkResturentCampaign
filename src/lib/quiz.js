export const QUIZ_QUESTIONS = [
  {
    id: 'seating',
    question: 'how many guests can you seat?',
    options: [
      { value: 'small', label: 'up to 40 seats', weight: { starter: 2, popular: 0, signature: 0 } },
      { value: 'mid', label: '41 to 80 seats', weight: { starter: 0, popular: 2, signature: 1 } },
      { value: 'large', label: 'more than 80 seats', weight: { starter: 0, popular: 1, signature: 2 } },
    ],
  },
  {
    id: 'budget',
    question: "what's your monthly marketing budget?",
    options: [
      { value: 'low', label: 'around BDT 20,000', weight: { starter: 2, popular: 0, signature: 0 } },
      { value: 'mid', label: 'around BDT 35,000', weight: { starter: 0, popular: 2, signature: 1 } },
      { value: 'high', label: 'BDT 55,000 or more', weight: { starter: 0, popular: 1, signature: 2 } },
    ],
  },
  {
    id: 'goal',
    question: 'what do you need most right now?',
    options: [
      { value: 'discover', label: 'get discovered & post consistently', weight: { starter: 2, popular: 1, signature: 0 } },
      { value: 'grow', label: 'grow with ads & campaigns', weight: { starter: 0, popular: 2, signature: 1 } },
      { value: 'premium', label: 'a full premium brand presence', weight: { starter: 0, popular: 0, signature: 2 } },
    ],
  },
  {
    id: 'volume',
    question: 'how much content do you want each month?',
    options: [
      { value: 'light', label: 'a steady 4 reels a month', weight: { starter: 2, popular: 1, signature: 0 } },
      { value: 'steady', label: 'around 8 reels a month', weight: { starter: 0, popular: 2, signature: 1 } },
      { value: 'heavy', label: '12 reels + full menu shoots', weight: { starter: 0, popular: 0, signature: 2 } },
    ],
  },
]

export function recommendPackage(answers) {
  const scores = { starter: 0, popular: 0, signature: 0 }
  for (const q of QUIZ_QUESTIONS) {
    const opt = q.options.find((o) => o.value === answers[q.id])
    if (opt) {
      for (const key in opt.weight) scores[key] += opt.weight[key]
    }
  }
  // Highest score wins; ties resolve toward the earlier (more affordable) tier.
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
}
