import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { SiGithub, SiX } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import favicoSvg from '../assets/logo.png'

export default function Footer() {
  const { t } = useLang()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <footer
      className="py-8 px-6"
      style={{
        background: isDark ? '#07071a' : '#0f0f1a',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden"
          >
            <img src={favicoSvg} alt="GGV" className="w-24 h-24 object-contain" />
          </div>
        </div>

        <p className="text-sm text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {t('footer.rights')}
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/gabriela-garcia-villalobos-639087382"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 hover:text-pink-400"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <span className="hidden sm:inline">LinkedIn</span>
            <FaLinkedin size={18} className="sm:hidden" />
          </a>
          <a
            href="https://github.com/GabyGV-GGV"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 hover:text-pink-400"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <span className="hidden sm:inline">GitHub</span>
            <SiGithub size={18} className="sm:hidden" />
          </a>
          <a
            href="https://x.com/garcia_gab84893"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 hover:text-pink-400"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <span className="hidden sm:inline">X</span>
            <SiX size={18} className="sm:hidden" />
          </a>
        </div>
      </div>
    </footer>
  )
}
