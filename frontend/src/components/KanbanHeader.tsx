import type { Dispatch, SetStateAction } from 'react'
import logo from '../assets/logo.svg'
import lightMode from '../assets/light_mode.svg'
import darkModeIcon from '../assets/dark_mode.svg'
import logoAzul from '../assets/logo azul.svg'

interface Props {
    darkMode: boolean
    setDarkMode: Dispatch<SetStateAction<boolean>>
}

export function KanbanHeader({ darkMode, setDarkMode }: Props) {
    function toggleDarkMode() {
        const newValue = !darkMode
        setDarkMode(newValue)
        localStorage.setItem('darkMode', String(newValue))
        document.documentElement.classList.toggle('dark')
    }

    const titleClass = darkMode ? 'text-primary-dark-mode' : 'text-white'

    return (
        <header
            className={`relative w-full shrink-0 flex items-center justify-between shadow-sm
                h-14 px-4
                sm:h-20 sm:px-10
                ${darkMode ? 'bg-[#333333]' : 'bg-primary-dark'}`}>
            <img
                src={darkMode ? logoAzul : logo}
                alt="uTask logo"
                className="relative z-10 h-7 w-7 object-contain shrink-0 sm:h-8 sm:w-60 sm:object-left"
            />

            <h1
                className={`absolute left-1/2 -translate-x-1/2 text-base sm:text-2xl font-bold whitespace-nowrap pointer-events-none ${titleClass}`}>
                uTask 3.0
            </h1>

            <button
                type="button"
                onClick={toggleDarkMode}
                aria-label="Alternar tema"
                className={`relative z-10 shrink-0 w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 sm:mr-6 ${
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
