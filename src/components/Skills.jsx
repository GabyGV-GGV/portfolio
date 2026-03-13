import { useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'
import {
SiJavascript, SiTypescript, SiSpring,
  SiReact, SiFlutter, SiNodedotjs, SiNestjs, SiDotnet, SiExpo,
  SiPostgresql, SiMysql, SiMongodb,
  SiFirebase, SiGooglecloud,
  SiDocker, SiGit, SiGithub, SiGitlab, SiPostman, SiFigma,
  SiGoogle
} from 'react-icons/si'
import { motion } from 'framer-motion'

const iconMap = {
  // Languages
  SiJavascript: { Icon: SiJavascript, color: '#F7DF1E' },
  SiTypescript: { Icon: SiTypescript, color: '#3178C6' },
  SiSpring: { Icon: SiSpring, color: '#6DB33F' }, // para Java
  // Frameworks & Libs
  SiReact: { Icon: SiReact, color: '#61DAFB' },
  SiFlutter: { Icon: SiFlutter, color: '#02569B' },
  SiNodedotjs: { Icon: SiNodedotjs, color: '#339933' },
  SiNestjs: { Icon: SiNestjs, color: '#E0234E' },
  SiDotnet: { Icon: SiDotnet, color: '#512BD4' },
  SiExpo: { Icon: SiExpo, color: '#000020' },
  // Databases
  SiPostgresql: { Icon: SiPostgresql, color: '#336791' },
  SiMysql: { Icon: SiMysql, color: '#4479A1' },
  SiMongodb: { Icon: SiMongodb, color: '#47A248' },
  // Cloud & Services
  SiFirebase: { Icon: SiFirebase, color: '#FFCA28' },
  SiGooglecloud: { Icon: SiGooglecloud, color: '#4285F4' },
  SiGoogle: { Icon: SiGoogle, color: '#4285F4' }, // genérico para Vertex AI
  // Tools
  SiDocker: { Icon: SiDocker, color: '#2496ED' },
  SiGit: { Icon: SiGit, color: '#F05032' },
  SiGithub: { Icon: SiGithub, color: '#181717' },
  SiGitlab: { Icon: SiGitlab, color: '#FC6D26' },
  SiPostman: { Icon: SiPostman, color: '#FF6C37' },
  SiFigma: { Icon: SiFigma, color: '#F24E1E' },
}

// SVGs personalizados para iconos que no existen en react-icons
const svgIcons = {
  csharpSVG: (
    <svg width="60" height="60" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
      <polygon points="125,10 240,70 240,180 125,240 10,180 10,70" fill="#9B4F96" />
      <polygon points="125,30 220,80 220,170 125,220 30,170 30,80" fill="#68217A" />
      <text x="50%" y="54%" textAnchor="middle" fontSize="90" fontWeight="bold" fill="#fff" fontFamily="Arial, Helvetica, sans-serif" dominantBaseline="middle">C#</text>
    </svg>
  ),
  reactNativeSVG: (
    <svg viewBox="0 0 256 256" width="60" height="60">
      <g>
        <circle cx="128" cy="128" r="36" fill="#61DAFB" />
        <ellipse rx="100" ry="36" cx="128" cy="128" fill="none" stroke="#61DAFB" strokeWidth="8" transform="rotate(0 128 128)" />
        <ellipse rx="100" ry="36" cx="128" cy="128" fill="none" stroke="#61DAFB" strokeWidth="8" transform="rotate(60 128 128)" />
        <ellipse rx="100" ry="36" cx="128" cy="128" fill="none" stroke="#61DAFB" strokeWidth="8" transform="rotate(120 128 128)" />
      </g>
    </svg>
  ),
  awsSVG: (
    <svg width="60" height="60" viewBox="0 0 400 400">
      <ellipse cx="200" cy="340" rx="120" ry="30" fill="#FF9900" opacity="0.2" />
      <path d="M 80 320 Q 200 380 320 320" stroke="#FF9900" strokeWidth="12" fill="none" />
      <text x="200" y="220" textAnchor="middle" fontSize="80" fontWeight="bold" fill="#FF9900" fontFamily="Arial, Helvetica, sans-serif">AWS</text>
    </svg>
  ),
  rxdbSVG: (
    <svg width="60" height="60" viewBox="0 0 60 60">
      <ellipse cx="30" cy="45" rx="22" ry="8" fill="#B7178C" opacity="0.15" />
      <rect x="12" y="15" width="36" height="30" rx="8" fill="#B7178C" />
      <ellipse cx="30" cy="15" rx="18" ry="7" fill="#fff" opacity="0.7" />
      <ellipse cx="30" cy="15" rx="18" ry="7" fill="none" stroke="#B7178C" strokeWidth="2" />
      <text x="30" y="38" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff" fontFamily="Arial, Helvetica, sans-serif">RxDB</text>
    </svg>
  ),
}

const iconGrid = [
  // Languages
  { name: 'JavaScript', iconKey: 'SiJavascript' },
  { name: 'TypeScript', iconKey: 'SiTypescript' },
  { name: 'Java', iconKey: 'SiSpring' },
  { name: 'C#', iconKey: 'csharpSVG' },
  // Frameworks & Libs
  { name: 'React', iconKey: 'SiReact' },
  { name: 'React Native', iconKey: 'reactNativeSVG' },

  { name: 'Flutter', iconKey: 'SiFlutter' },
  { name: 'Node.js', iconKey: 'SiNodedotjs' },
  { name: 'NestJS', iconKey: 'SiNestjs' },
  { name: '.NET', iconKey: 'SiDotnet' },
  { name: 'Expo', iconKey: 'SiExpo' },
  // Databases
  { name: 'PostgreSQL', iconKey: 'SiPostgresql' },
  { name: 'MySQL', iconKey: 'SiMysql' },
  { name: 'MongoDB', iconKey: 'SiMongodb' },
  { name: 'RxDB', iconKey: 'rxdbSVG' },
  // Cloud & Services
  { name: 'Firebase', iconKey: 'SiFirebase' },
  { name: 'AWS', iconKey: 'awsSVG' },

  { name: 'Google Cloud', iconKey: 'SiGooglecloud' },
  { name: 'Vertex AI', iconKey: 'SiGooglecloud' },
  // Tools
  { name: 'Docker', iconKey: 'SiDocker' },
  { name: 'Git', iconKey: 'SiGit' },
  { name: 'GitHub', iconKey: 'SiGithub' },
  { name: 'GitLab', iconKey: 'SiGitlab' },
  { name: 'Postman', iconKey: 'SiPostman' },
  { name: 'Figma', iconKey: 'SiFigma' },
]
  
export default function Skills() {
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

  return (
    <section
      id="skills"
      className="py-24 px-6"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <motion.div
        ref={sectionRef}
        className="max-w-5xl mx-auto section-animate"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <div className="text-center mb-14">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            {t('skills.title')}
          </motion.h2>
          <motion.div
            className="w-12 h-1 rounded-full mx-auto"
            style={{ background: 'linear-gradient(90deg, #7c3aed, #ec4899)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {iconGrid.map(({ name, iconKey }) => {
            const entry = iconMap[iconKey]
            return (
              <motion.div
                key={name}
                className={`skill-card ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} shadow-md rounded-xl flex flex-col items-center justify-center p-4 transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {entry
                  ? <entry.Icon size={60} color={entry.color} />
                  : svgIcons[iconKey] || null}
                <p className={`skill-card-title ${isDark ? '!text-white' : 'text-black'} font-semibold mt-2`}>{name}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
