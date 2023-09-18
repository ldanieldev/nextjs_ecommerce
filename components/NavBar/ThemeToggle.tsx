'use client'
import { useThemeContext } from '@/contexts/Theme'
import { MdLightMode, MdModeNight } from 'react-icons/md'

type props = {
  className?: string
}
export default function ThemeToggle(props: props) {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <button
      type="button"
      className={`flex items-center focus:outline-none ${props.className}`}
      aria-label="toggle website theme"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <MdLightMode
          className="text-yellow-300"
          size={24}
          title="switch to light mode"
        />
      ) : (
        <MdModeNight
          className="fill-slate-500"
          size={24}
          title="switch to dark mode"
        />
      )}
    </button>
  )
}
