import { useState, useEffect } from 'react'
import { HiChevronUp } from 'react-icons/hi'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, #D40662, #A8004D)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
      }}
      aria-label="Scroll to top"
    >
      <HiChevronUp size={22} />
    </button>
  )
}
