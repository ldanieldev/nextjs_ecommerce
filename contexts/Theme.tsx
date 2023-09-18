'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type ThemeColor = 'light' | 'dark'

interface ContextProps {
  theme: ThemeColor
  isThemeLoaded: boolean
  toggleTheme?: () => void
  applyTheme?: (theme: ThemeColor) => void
}

const ThemeContext = createContext<ContextProps>({
  theme: 'dark',
  isThemeLoaded: false,
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeColor>('dark')
  const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (!('theme' in localStorage)) {
      localStorage.setItem('theme', theme)
    }
    applyTheme(localStorage.theme)
    setIsThemeLoaded(true)
  }, [theme])

  const toggleTheme = () => applyTheme(theme === 'dark' ? 'light' : 'dark')

  const applyTheme = (theme: ThemeColor) => {
    const html: HTMLElement = document.documentElement

    setTheme(theme)

    if (theme === 'dark') html.classList.add('dark')
    else html.classList.remove('dark')

    html.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  return (
    <ThemeContext.Provider
      value={{ theme, isThemeLoaded, toggleTheme, applyTheme }}
    >
      {isThemeLoaded && children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
