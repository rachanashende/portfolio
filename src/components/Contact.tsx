import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Loader2, Mail, MapPin, Send, AlertCircle } from 'lucide-react'
import linkedinLogo from 'devicon/icons/linkedin/linkedin-original.svg'
import githubLogo from 'devicon/icons/github/github-original.svg'
import { gmailComposeUrl, mailtoUrl, profile } from '../data/profile'
import { Reveal, SectionIntro, easeOut } from './Reveal'

/**
 * Optional direct-send endpoint (e.g. Formspree). When it isn't configured,
 * the form hands the message to the visitor's own email instead.
 */
const FORM_ENDPOINT = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined)?.trim() || ''

type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'success'; text: string } | { kind: 'error'; text: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Fields): Errors {
  const errors: Errors = {}
  if (f.name.trim().length < 2) errors.name = 'Please tell me your name.'
  if (!f.email.trim()) errors.email = 'I’ll need an email address to reply to.'
  else if (!EMAIL_RE.test(f.email.trim())) errors.email = 'That email address doesn’t look quite right.'
  if (f.message.trim().length < 10) errors.message = 'Write a little more — at least 10 characters.'
  return errors
}

function composeBody(f: Fields) {
  return `${f.message.trim()}\n\n— ${f.name.trim()}\n${f.email.trim()}`
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

function EmailCard() {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    if (await copyText(profile.email)) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }
  return (
    <div className="glass rounded-[2rem] p-6 md:p-8">
      <p className="eyebrow flex items-center gap-2">
        <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Email
      </p>
      <div className="mt-3 flex items-center gap-2">
        <a href={mailtoUrl()} className="min-w-0 break-all text-[clamp(1.15rem,2.6vw,1.55rem)] font-medium tracking-tight text-ink underline decoration-pink-deep/60 decoration-2 underline-offset-[6px] transition-colors hover:decoration-pink-deep">
          {profile.email}
        </a>
        <button
          type="button"
          onClick={onCopy}
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink-soft transition-all hover:-translate-y-0.5 hover:text-ink"
          aria-label={copied ? 'Email address copied' : 'Copy email address'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={copied ? 'y' : 'n'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
              {copied ? <Check className="h-4 w-4 text-[#2a9d6a]" /> : <Copy className="h-4 w-4" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      <p className="mt-1 h-5 text-sm text-[#2a9d6a]" aria-live="polite">
        {copied ? 'Copied to your clipboard.' : ''}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={gmailComposeUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(31,28,38,.6)]"
        >
          Write in Gmail
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a href={mailtoUrl()} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5">
          Open mail app
        </a>
      </div>
    </div>
  )
}

function SocialCard({ href, logo, label, handle }: { href: string; logo: string; label: string; handle: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group flex items-center gap-4 rounded-[1.6rem] p-4 pr-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <img src={logo} alt="" width={26} height={26} className="h-6.5 w-6.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium text-ink">{label}</span>
        <span className="block truncate text-sm text-ink-muted">{handle}</span>
      </span>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-soft">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="mt-1.5 flex items-center gap-1.5 text-sm text-[#c2364a]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass =
  'w-full rounded-2xl border border-[#e7e2ef] bg-white/85 px-4 py-3.5 text-[16px] text-ink placeholder:text-ink-muted/60 outline-none transition-all focus:border-lavender-deep focus:bg-white focus:shadow-[0_0_0_4px_rgba(185,168,245,.3)] aria-[invalid=true]:border-[#e58a99]'

function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const direct = Boolean(FORM_ENDPOINT)

  const update = (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [key]: e.target.value }
    setFields(next)
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }))
  }

  const check = () => {
    const found = validate(fields)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0]
    if (firstInvalid) {
      document.getElementById(`cf-${firstInvalid}`)?.focus()
      setStatus({ kind: 'idle' })
      return false
    }
    return true
  }

  const openGmail = () => {
    if (!check()) return
    const win = window.open(gmailComposeUrl(composeBody(fields)), '_blank')
    if (win) {
      win.opener = null
      setStatus({ kind: 'success', text: 'Gmail opened in a new tab with your message ready — just press Send there.' })
    } else {
      setStatus({ kind: 'error', text: 'Your browser blocked the new tab. Try “Use my email app” instead.' })
    }
  }

  const openMailApp = () => {
    if (!check()) return
    window.location.href = mailtoUrl(composeBody(fields))
    setStatus({ kind: 'success', text: 'Your email app should now be open with the message filled in. Press Send there to deliver it.' })
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!direct) {
      openGmail()
      return
    }
    if (!check()) return
    setStatus({ kind: 'sending' })
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.message.trim(),
          _subject: profile.emailSubject,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus({ kind: 'success', text: `Thank you, ${fields.name.trim().split(' ')[0]}! Your message has been sent — I’ll get back to you soon.` })
      setFields({ name: '', email: '', message: '' })
    } catch {
      setStatus({ kind: 'error', text: 'Something went wrong and your message wasn’t sent. Please try again, or email me directly.' })
    }
  }

  const errProps = (key: keyof Fields) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `cf-${key}-error` : undefined,
  })

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-[2rem] p-6 md:p-8" aria-labelledby="contact-form-title">
      <h3 id="contact-form-title" className="text-xl font-semibold tracking-tight text-ink">
        Send a message
      </h3>
      <p className="mt-1 text-sm text-ink-muted">
        {direct
          ? 'Fill this in and it comes straight to my inbox.'
          : 'This opens your own email with everything filled in — nothing is sent until you press Send there.'}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="cf-name" label="Name" error={errors.name}>
          <input id="cf-name" name="name" autoComplete="name" required value={fields.name} onChange={update('name')} className={inputClass} placeholder="Your name" {...errProps('name')} />
        </Field>
        <Field id="cf-email" label="Email" error={errors.email}>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={update('email')}
            className={inputClass}
            placeholder="you@example.com"
            {...errProps('email')}
          />
        </Field>
      </div>
      <div className="mt-4">
        <Field id="cf-message" label="Message" error={errors.message}>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            value={fields.message}
            onChange={update('message')}
            className={`${inputClass} resize-y`}
            placeholder="Hi Rachana, I’d love to talk about…"
            {...errProps('message')}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status.kind === 'sending'}
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-14px_rgba(31,28,38,.6)] disabled:translate-y-0 disabled:opacity-60"
        >
          {status.kind === 'sending' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4 transition-transform group-hover:-rotate-12 group-hover:translate-x-0.5" aria-hidden="true" />
          )}
          {direct ? (status.kind === 'sending' ? 'Sending…' : 'Send message') : 'Send with Gmail'}
        </button>
        {!direct && (
          <button type="button" onClick={openMailApp} className="inline-flex h-12 items-center rounded-full bg-white px-5 text-[15px] font-medium text-ink transition-all hover:-translate-y-0.5">
            Use my email app
          </button>
        )}
      </div>

      <div aria-live="polite" className="min-h-0">
        <AnimatePresence mode="wait">
          {(status.kind === 'success' || status.kind === 'error') && (
            <motion.p
              key={status.text}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className={`mt-5 flex gap-2 rounded-2xl px-4 py-3 text-sm ${
                status.kind === 'success' ? 'bg-mint text-[#1f6b4a]' : 'bg-[#ffe3e6] text-[#a3303f]'
              }`}
              role={status.kind === 'error' ? 'alert' : undefined}
            >
              {status.kind === 'success' ? <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
              {status.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative px-5 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Contact"
          title="Let’s build something together."
          sub="Have an interesting opportunity or just want to say hello? I’d love to hear from you."
          highlight={['together']}
        />

        <div className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-[1fr_1.15fr] lg:gap-6">
          <Reveal className="flex flex-col gap-5">
            <EmailCard />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <SocialCard href={profile.linkedin} logo={linkedinLogo} label="LinkedIn" handle="rachana-prashant-shende" />
              <SocialCard href={profile.github} logo={githubLogo} label="GitHub" handle="@rachanashende" />
            </div>
            <p className="flex items-center gap-2 px-2 text-sm text-ink-muted">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
