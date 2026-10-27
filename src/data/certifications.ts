export interface Certification {
  title: string
  issuer: string
  tint: string
  ink: string
}

export const certifications: Certification[] = [
  { title: 'Agentic AI Foundations Associate', issuer: 'Oracle', tint: '#ffe3e6', ink: '#b83a49' },
  { title: 'Cloud Computing', issuer: 'AWS', tint: '#ffeedd', ink: '#a85a14' },
  { title: 'Python Programming', issuer: 'Infosys Springboard', tint: '#dcefff', ink: '#2a6aa6' },
  { title: 'C Programming', issuer: 'Infosys Springboard', tint: '#e6dfff', ink: '#5f48c4' },
  { title: 'AI Skills Passport', issuer: 'EY and Microsoft', tint: '#dcf5ea', ink: '#1f7a53' },
]
