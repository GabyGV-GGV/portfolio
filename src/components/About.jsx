import { useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'
import { HiDownload } from 'react-icons/hi'
import logoImg from '../assets/logo.png'
import fotoImg from '../assets/proyectos/foto.jpeg'
import { motion } from 'framer-motion'

export default function About() {
  const { theme } = useTheme()
  const { t } = useLang()
  const isDark = theme === 'dark'
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('section-visible')
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      className="py-24 px-6"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div ref={sectionRef} className="max-w-5xl mx-auto section-animate">
        <div className="flex justify-center mb-10">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full"
            style={{
              color: '#D40662',
              backgroundColor: isDark ? 'rgba(212,6,98,0.15)' : 'rgba(212,6,98,0.1)',
              border: '1px solid rgba(212,6,98,0.35)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            {t('about.badge')}
          </span>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="relative flex items-center justify-center">
                <img
                  src={fotoImg}
                  alt="Foto perfil"
                  className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl border-4 border-pink-400"
                  style={{ background: '#fff' }}
                  onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = logoImg; }}
                />
                {/* Partículas/decorativos restaurados en tonos lilas, amarillos y rosas */}
                <div
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full -z-10"
                  style={{ background: 'radial-gradient(circle at 30% 70%, #e879f9 60%, #f472b6 100%)', opacity: 0.35 }}
                />
                <div
                  className="absolute -top-6 -left-6 w-16 h-16 rounded-full -z-10"
                  style={{ background: 'radial-gradient(circle at 60% 40%, #f59e0b 60%, #f472b6 100%)', opacity: 0.35 }}
                />
                <div
                  className="absolute top-1/2 left-0 w-8 h-8 rounded-full -z-10"
                  style={{ background: 'radial-gradient(circle, #a78bfa 60%, #f472b6 100%)', opacity: 0.25, transform: 'translateY(-50%)' }}
                />
              </div>
              {/* Eliminados los decorativos de fondo para que solo se vea la imagen */}
            </div>
          </div>

          {/* Right - Text */}
          <div>
            <motion.div
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: 'var(--text-primary)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <h2
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('about.title')}
              </h2>
            </motion.div>
            <span className="title-underline" style={{ marginBottom: '16px' }} />
            <p
              className="text-base md:text-lg leading-relaxed mb-8 mt-4 subtitle-animate"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('about.description')}
            </p>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white btn-pop btn-texture"
              style={{ background: 'linear-gradient(135deg, #D40662, #A8004D)' }}
            >
              <HiDownload size={18} />
              {t('about.cv')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
