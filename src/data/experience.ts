export interface Experience {
  role: string
  org: string
  place: string
  period: string
  highlight: { value: string; label: string }
  points: string[]
  tint: string
  ink: string
}

export const experience: Experience[] = [
  {
    role: 'Events and Operations Associate',
    org: 'Open Source Club',
    place: 'Bengaluru',
    period: 'April 2026 – Present',
    highlight: { value: '200+', label: 'volunteers coordinated' },
    points: [
      'Coordinated more than 200 volunteers across two technical workshops and a college-wide hackathon.',
      'Managed scheduling, resource allocation and participant logistics.',
    ],
    tint: '#ece6ff',
    ink: '#6a52cf',
  },
  {
    role: 'Teaching Assistant Volunteer',
    org: 'Bagalagunte Government High School',
    place: 'Bengaluru',
    period: 'November 2025 – January 2026',
    highlight: { value: 'Grades 7–9', label: 'Mathematics & English' },
    points: [
      'Taught Mathematics and English to students in grades 7–9.',
      'Designed interactive lesson plans with fellow volunteers.',
      'Helped sustain consistent classroom attendance and participation.',
    ],
    tint: '#ffe6d6',
    ink: '#b8622a',
  },
]
