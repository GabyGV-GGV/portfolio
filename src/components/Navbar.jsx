import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'
import { HiSun, HiMoon, HiMenu, HiX, HiTranslate } from 'react-icons/hi'
import favicoSvg from '../assets/logo.png'

const sections = ['home', 'about', 'projects', 'skills', 'contact']

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      let current = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 80) current = id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const isDark = theme === 'dark'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? isDark ? 'rgba(10,10,26,0.96)' : 'rgba(255,255,255,0.96)'
          : isDark ? 'rgba(10,10,26,0.7)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? `1px solid var(--border-color)` : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 group"
          aria-label="Inicio"
        >
          <div className="w-12 h-12 rounded-sm overflow-hidden flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            <img src={favicoSvg} alt="GGV" className="w-full h-full" />
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="text-sm font-medium transition-colors duration-200 relative group"
              style={{
                color: active === s ? '#D40662' : 'var(--text-secondary)',
              }}
            >
              {t(`nav.${s}`)}
              <span
                className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                style={{ width: active === s ? '100%' : '0%', background: '#D40662' }}
              />
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          {/* Language Toggle */}
          <div
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold px-3 py-1"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <span
              onClick={lang === 'en' ? toggleLang : undefined}
              className="relative cursor-pointer transition-colors duration-200"
              style={{
                color: lang === 'es' ? '#D40662' : 'var(--text-secondary)',
                cursor: lang === 'es' ? 'default' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (lang !== 'es') e.currentTarget.style.color = '#888'
              }}
              onMouseLeave={(e) => {
                if (lang !== 'es') e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              ES
              {lang === 'es' && (
                <span
                  className="absolute -bottom-0.5 left-0 w-full h-[2px]"
                  style={{ background: '#D40662' }}
                />
              )}
            </span>

            <span style={{ color: 'var(--text-secondary)' }}>/</span>

            <span
              onClick={lang === 'es' ? toggleLang : undefined}
              className="relative cursor-pointer transition-colors duration-200"
              style={{
                color: lang === 'en' ? '#D40662' : 'var(--text-secondary)',
                cursor: lang === 'en' ? 'default' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (lang !== 'en') e.currentTarget.style.color = '#888'
              }}
              onMouseLeave={(e) => {
                if (lang !== 'en') e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              EN
              {lang === 'en' && (
                <span
                  className="absolute -bottom-0.5 left-0 w-full h-[2px]"
                  style={{ background: '#D40662' }}
                />
              )}
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(212,6,98,0.12)'; e.currentTarget.style.color = '#D40662'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            aria-label="Toggle theme"
          >
            {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMenuOpen(o => !o)}
            style={{ color: 'var(--text-primary)' }}
            aria-label="Menu"
          >
            {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-4"
          style={{ backgroundColor: isDark ? 'rgba(10,10,26,0.98)' : 'rgba(255,255,255,0.98)' }}
        >
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="text-left text-sm font-medium py-1"
              style={{ color: active === s ? '#D40662' : 'var(--text-primary)' }}
            >
              {t(`nav.${s}`)}
            </button>
          ))}
          <button
            onClick={toggleLang}
            className="text-left text-sm font-semibold"
            style={{ color: 'var(--text-secondary)' }}
          >
            {lang === 'es' ? 'ES / EN' : 'EN / ES'}
          </button>
        </div>
      )}
    </nav>
  )
}
