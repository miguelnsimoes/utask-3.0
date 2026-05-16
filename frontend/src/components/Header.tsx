import { useTheme } from '../contexts/ThemeContext'
import lightMode from '../assets/light_mode.svg'
import darkModeIcon from '../assets/dark_mode.svg' 

export function Header() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <header className={`w-full h-[52px] flex items-center justify-end px-6 shadow-md ${darkMode ? 'bg-primary-mid-dark' : 'bg-primary-dark'}`}>
        <button
            onClick={toggleDarkMode} 
            className={`w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 ${
                darkMode
                    ? 'bg-gradient-to-r from-dark-surface to-dark-deep'
                    : 'bg-yellow-400'
            }`}>
            <div className={`w-6 h-6 bg-white rounded-full flex items-center justify-center transition-transform duration-300 ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
            }`}>
                <img
                    src={darkMode ? darkModeIcon : lightMode}
                    alt="modo"
                    className="w-4 h-4"
                />
            </div>
        </button>
    </header>
  )
}