import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'
import { projects } from '../data/projects'
// Importa todas las imágenes de la carpeta proyectos
const allImages = import.meta.glob('/src/assets/proyectos/*.webp', { eager: true, as: 'url' });

// Devuelve las imágenes que coinciden con el prefijo del proyecto
function getProjectImages(prefix) {
  return Object.values(allImages).filter(url => url.includes(prefix));
}
import { HiChevronLeft, HiChevronRight, HiExternalLink } from 'react-icons/hi'
import { motion } from 'framer-motion'

export default function Projects() {
  const { theme } = useTheme()
  const { t } = useLang()
  const isDark = theme === 'dark'
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)
  const sectionRef = useRef(null)

  const go = useCallback((dir) => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setCurrent((c) => (c + dir + projects.length) % projects.length)
      setAnimating(false)
    }, 350)
  }, [animating])

  const goTo = (index) => {
    if (index === current || animating) return
    setDirection(index > current ? 1 : -1)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 350)
  }

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 6000)
    return () => clearInterval(timerRef.current)
  }, [go])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => go(1), 6000)
  }

  const handlePrev = () => { go(-1); resetTimer() }
  const handleNext = () => { go(1); resetTimer() }
  const handleDot = (i) => { goTo(i); resetTimer() }

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

  const project = projects[current]
  // Detectar prefijo para buscar imágenes (usa el primer fragmento del primer nombre de imagen esperado)
  let prefix = ''
  if (project.name.toLowerCase().includes('caredriver')) prefix = 'caredriver_';
  else if (project.name.toLowerCase().includes('miio')) prefix = 'miio_';
  else if (project.name.toLowerCase().includes('dominio')) prefix = 'dominio_';
  else if (project.name.toLowerCase().includes('fsociety')) prefix = 'fsociety_';
  else if (project.name.toLowerCase().includes('tarjeta')) prefix = 'tarjetag_';
  const images = getProjectImages(prefix);

  return (
    <section
      id="projects"
      className="py-24 px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div ref={sectionRef} className="max-w-6xl mx-auto section-animate">
        {/* Header */}
        <div className="mb-12 relative">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            {t('projects.title')}
          </motion.h2>
          <span className="title-underline" style={{ marginBottom: '10px' }} />
          <p className="text-sm md:text-base mt-3 subtitle-animate" style={{ color: 'var(--text-secondary)' }}>
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: `1px solid var(--border-color)`,
            boxShadow: isDark ? '0 8px 40px rgba(0,0,0,0.4)' : '0 8px 40px rgba(0,0,0,0.08)',
          }}
        >
          {/* Card */}
          <div
            className="project-card grid grid-cols-1 md:grid-cols-2"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction * 40}px)`
                : 'translateX(0)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            {/* Left - Visual: solo imagen/carrusel o solo bloque de letra/nombre/subtítulo */}
            <div
              className="relative flex flex-col items-center justify-center min-h-64 md:min-h-80 p-0"
              style={{ background: project.gradient }}
            >
              {images.length > 0 ? (
                <div className="absolute inset-0 w-full h-full z-0">
                  <img
                    src={images[0]}
                    alt={project.name}
                    className="w-full h-full object-cover object-center transition-all duration-300"
                    style={{ borderRadius: 'inherit' }}
                  />
                  {/* Overlay para oscurecer un poco la imagen si se desea */}
                  {/* <div className="absolute inset-0 bg-black/10" /> */}
                </div>
              ) : (
                <div className="text-center z-10">
                  <div
                    className="inline-flex items-center justify-center w-24 h-24 rounded-2xl font-black text-3xl text-white mb-4 shadow-2xl"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
                  >
                    {project.letter}
                  </div>
                  <h3 className="text-xl font-black text-white tracking-wider">{project.name}</h3>
                  <p className="text-sm mt-1 font-medium" style={{ color: project.accent }}>
                    {project.subtitle}
                  </p>
                </div>
              )}
              {/* Decorative circles */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-10 z-20" style={{ background: project.accent }} />
              <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full opacity-10 z-20" style={{ background: project.accent }} />
            </div>

            {/* Right - Info */}
            <div
              className="p-7 md:p-9 flex flex-col justify-between"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <div>
                {/* Role + Year */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: isDark ? 'rgba(212,6,98,0.2)' : 'rgba(212,6,98,0.1)',
                      color: '#D40662',
                      border: '1px solid rgba(212,6,98,0.25)',
                    }}
                  >
                    {project.year}
                  </span>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ color: 'var(--text-muted)', background: 'var(--bg-tertiary)' }}
                  >
                    {project.role}
                  </span>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2.5 py-1 rounded-md"
                      style={{
                        color: project.accent,
                        background: 'rgba(0,0,0,0.06)',
                        border: `1px solid ${project.accent}33`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bullets */}
                <ul className="space-y-1.5 mb-6">
                  {project.bullets.slice(0, 5).map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{ color: '#D40662' }}
              >
                {t('projects.visit')}
                <HiExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  background: i === current ? '#D40662' : 'var(--border-color)',
                }}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter + Arrows */}
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {current + 1} / {projects.length}
            </span>
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#D40662'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#D40662' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)' }}
              aria-label={t('projects.prev')}
            >
              <HiChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#D40662'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#D40662' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)' }}
              aria-label={t('projects.next')}
            >
              <HiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
