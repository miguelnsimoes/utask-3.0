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
    return (
        <header className={`w-full flex items-center h-20 relative px-10 shadow-sm ${darkMode ? 'bg-primary-mid-dark' : 'bg-primary-dark'}`}> {/* MUDOU */}
            
            <img src={darkMode ? logoAzul : logo} alt="uTask logo" className="w-60 h-8" />

            <h1 className={`text-2xl font-bold absolute left-1/2 -translate-x-1/2 ${darkMode ? 'text-primary-dark-mode' : 'text-white'}`}>uTask 3.0</h1>

            <button
                onClick={() => setDarkMode(!darkMode)}
                className={`ml-auto mr-6 w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 ${
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