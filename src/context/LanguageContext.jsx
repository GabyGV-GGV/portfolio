import { createContext, useContext, useState } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es')

  const toggleLang = () => setLang(l => (l === 'es' ? 'en' : 'es'))

  const t = (path) => {
    const keys = path.split('.')
    let value = translations[lang]
    for (const key of keys) {
      if (value === undefined) return path
      value = value[key]
    }
    return value ?? path
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
