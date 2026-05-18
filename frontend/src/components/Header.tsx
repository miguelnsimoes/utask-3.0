import { useTheme } from '../contexts/ThemeContext'
import lightMode from '../assets/light_mode.svg'
import darkModeIcon from '../assets/dark_mode.svg'
import logo from '../assets/logo.svg'
import logoAzul from '../assets/logo azul.svg'

interface HeaderProps {
    isLogin?: boolean
}

export function Header({ isLogin = false }: HeaderProps) {
    const { darkMode, toggleDarkMode } = useTheme()

    const titleClass = darkMode ? 'text-primary-dark-mode' : 'text-white'

    return (
        <header
            className={`relative w-full shrink-0 flex items-center justify-between shadow-md
                h-14 px-4
                sm:h-[52px] sm:justify-end sm:px-6
                ${darkMode ? 'bg-[#333333]' : 'bg-primary-dark'}`}>

            {!isLogin && (
                <>
                    <img
                        src={darkMode ? logoAzul : logo}
                        alt="uTask logo"
                        className="relative z-10 h-8 w-8 object-contain shrink-0 sm:hidden"
                    />

                    <h1
                        className={`absolute left-1/2 -translate-x-1/2 text-lg font-bold whitespace-nowrap pointer-events-none sm:hidden ${titleClass}`}>
                        uTask 3.0
                    </h1>
                </>
            )}

            <button
                type="button"
                onClick={toggleDarkMode}
                aria-label="Alternar tema"
                className={`relative z-10 shrink-0 ml-auto w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 ${
                    darkMode ? 'bg-gradient-to-r from-dark-surface to-dark-deep' : 'bg-yellow-400'
                }`}>
                <div
                    className={`w-6 h-6 bg-white rounded-full flex items-center justify-center transition-transform duration-300 ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}>
                    <img src={darkMode ? darkModeIcon : lightMode} alt="" className="w-4 h-4" />
                </div>
            </button>
        </header>
    )
}