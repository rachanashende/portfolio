export const profile = {
  name: 'Rachana Shende',
  firstName: 'Rachana',
  location: 'Bangalore, India',
  roles: ['Computer Science Student', 'Full-Stack Developer', 'Curious Creator'],
  statement:
    'I enjoy building useful applications, exploring new technologies, and turning ideas into working products.',
  email: 'rachanashende09@gmail.com',
  emailSubject: 'Hello Rachana — Let’s Connect',
  linkedin: 'https://linkedin.com/in/rachana-prashant-shende',
  github: 'https://github.com/rachanashende',
} as const

/** Gmail's web composer, opened in a new tab with recipient and subject filled in. */
export function gmailComposeUrl(body?: string) {
  const enc = encodeURIComponent
  let url = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(profile.email)}&su=${enc(profile.emailSubject)}`
  if (body) url += `&body=${enc(body)}`
  return url
}

/** The visitor's default email application. */
export function mailtoUrl(body?: string) {
  let url = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`
  if (body) url += `&body=${encodeURIComponent(body)}`
  return url
}
