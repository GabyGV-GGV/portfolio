import { useState, useEffect, useRef } from "react";
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'
import { HiArrowRight, HiMail } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation';

const codeLines = [
  'const dev = new Developer({',
  '  name: "Gabriela Garcia",',
  '  stack: ["React", "Node.js",',
  '          "Flutter", "Firebase"],',
  '  passion: "building_great_apps",',
  '  location: "Bolivia",',
  '})',
  '',
  'dev.build(ideas)',
  '  .withElegance()',
  '  .deploy(production)',
]

export default function Hero() {
  const { theme } = useTheme()
  const { t } = useLang()
  const isDark = theme === 'dark'
  const titleRef = useRef(null)
  const words = [t('hero.name1'), t('hero.name2')]
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index]

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1))

        if (text.length + 1 === current.length) {
          setDeleting(true)
        }
      } else {
        setText(current.slice(0, text.length - 1))

        if (text.length === 0) {
          setDeleting(false)
          setIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, deleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [text, deleting, index])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('hero-visible', e.isIntersecting))
      },
      { threshold: 0.1 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  const particles = useRef(
    Array.from({ length: 30 }).map(() => ({
      x: Math.random() * 100,
      size: Math.random() * 60 + 8, // tamaños variados
      duration: Math.random() * 10 + 10, // velocidad suave
      delay: Math.random() * 10 // aparición escalonada
    }))
  )
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 pb-12 px-6 overflow-hidden relative"
      style={{ background: 'var(--bg-hero)' }}
    >
      {particles.current.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: "#D40662",
            bottom: "-80px", // empiezan abajo
            left: `${p.x}%`,
            opacity: 0.25,
            filter: "blur(1px)"
          }}
          animate={{
            y: ["0vh", "-120vh"], // suben toda la pantalla
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div ref={titleRef}>

          <div className="hero-animate hero-stagger-1">
            <span
              className="inline-block text-xs font-bold tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{
                color: '#D40662',
                backgroundColor: isDark ? 'rgba(212,6,98,0.15)' : 'rgba(212,6,98,0.1)',
                border: '1px solid rgba(212,6,98,0.35)',
              }}
            >
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">

            <span className="block hero-animate hero-stagger-2" style={{ color: 'var(--text-primary)' }}>
              {t('hero.greeting')}
            </span>

            <span className="block hero-gradient-1 hero-animate hero-stagger-3">
              <TypeAnimation
                sequence={[
                  t('hero.name1'),
                  2000,
                  '',
                  500,
                  t('hero.name1'),
                  2000,
                  '',
                  500
                ]}
                speed={60}
                repeat={Infinity}
                wrapper="span"
              />
            </span>

          </h1>

          <div className="hero-animate hero-stagger-5">
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-md"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('hero.description')}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 hero-animate hero-stagger-6 relative z-10">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-modern gap-2"
            >
              {t('hero.cta1')}
              <HiArrowRight size={18} />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-modern-gray gap-2"
            >
              <HiMail size={18} />
              {t('hero.cta2')}
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center hero-animate hero-code">
          <div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #0d0d2b 0%, #1a0533 60%, #0f0f1a 100%)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
              <div className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
              <span className="ml-3 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>portfolio.js</span>
            </div>

            <div className="p-6 font-mono text-sm leading-relaxed code-float">
              {codeLines.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span style={{ color: 'rgba(255,255,255,0.2)', userSelect: 'none', minWidth: '20px', textAlign: 'right' }}>
                    {line ? i + 1 : ''}
                  </span>
                  <span style={{ color: colorLine(line) }}>{line || '\u00A0'}</span>
                </div>
              ))}
            </div>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 70% 30%, rgba(212,6,98,0.12) 0%, transparent 60%)',
              }}
            />
          </div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        onClick={() =>
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D40662"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>

    </section>
  )
}

function colorLine(line) {
  if (line.includes('const') || line.includes('new')) return '#c792ea'
  if (line.includes(':') && !line.includes('//')) return '#82aaff'
  if (line.startsWith('  ') && line.includes('"')) return '#c3e88d'
  if (line.includes('.build') || line.includes('.with') || line.includes('.deploy')) return '#89ddff'
  if (line === '') return 'transparent'
  return '#a6accd'
}
