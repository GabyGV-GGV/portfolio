import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'
import { HiUser, HiMail, HiPaperAirplane } from 'react-icons/hi'
import { SiWhatsapp, SiTelegram } from 'react-icons/si'
import { motion } from 'framer-motion'
import { FormField } from './shared/SharedComponents'

export default function Contact() {
  const { theme } = useTheme()
  const { t } = useLang()
  const isDark = theme === 'dark'
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('section-visible') })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const contacts = [
    {
      Icon: HiUser,
      label: 'Gabriela Garcia Villalobos',
      href: null,
      color: '#D40662',
    },
    {
      Icon: HiMail,
      label: 'gabriela.garcia.villalobos.dev@gmail.com',
      href: 'mailto:gabriela.garcia.villalobos.dev@gmail.com',
      color: '#ec4899',
    },
    {
      Icon: SiWhatsapp,
      label: '+591 76435692',
      href: 'https://wa.me/59176435692',
      color: '#25D366',
    },
    {
      Icon: SiTelegram,
      label: '@gabrielagarciavillalobosdev',
      href: 'https://t.me/gabrielagarciavillalobosdev',
      color: '#229ED9',
    },
  ]

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div ref={sectionRef} className="max-w-5xl mx-auto section-animate">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left - Info */}
          <div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: 'var(--text-primary)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              {t('contact.title')}
            </motion.h2>
            <span className="title-underline" style={{ marginBottom: '12px' }} />
            <p
              className="text-base leading-relaxed mb-8 mt-3 subtitle-animate"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('contact.subtitle')}
            </p>

            <div className="space-y-4">
              {contacts.map(({ Icon, label, href, color }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}33` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium break-all transition-colors duration-200 hover:underline"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {label}
                    </a>
                  ) : (
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-7"
            style={{
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--card-bg)',
            }}
          >
            <form
              action="https://formspree.io/f/mlgpnzqq"
              method="POST"
              className="space-y-4"
            >
              <div className="form-field">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t('contact.form.namePlaceholder')}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-transparent text-base"
                />
              </div>
              <div className="form-field">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  {t('contact.form.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('contact.form.phonePlaceholder')}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-transparent text-base"
                />
              </div>
              <div className="form-field">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t('contact.form.emailPlaceholder')}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-transparent text-base"
                />
              </div>
              <div className="form-field">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  {t('contact.form.message')}
                </label>
                <textarea
                  name="message"
                  required
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={4}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-transparent text-base"
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
              </div>
              <div className="form-field">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 btn-pop btn-texture"
                  style={{ background: 'linear-gradient(135deg, #F5AC06, #c68e0d)' }}
                >
                  {t('contact.form.send')}
                  <HiPaperAirplane size={16} style={{ transform: 'rotate(90deg)' }} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
