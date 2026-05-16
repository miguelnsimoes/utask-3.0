import favorite from '../assets/favorite.svg'

interface Props { 
    darkMode: boolean
}

export function Footer({ darkMode }: Props) { 
    return (
        <footer className={`w-full flex items-center justify-between px-16 py-4 ${darkMode ? 'bg-[#111111]' : 'bg-primary-darker'}`}>
            <p className="text-white text-sm">
                © Processo de Trainee <strong>Unect Jr.</strong>
            </p>
            <p className="text-white text-sm flex items-center gap-1">
                Feito com <img src={favorite} alt="coração" className="w-4 h-4" /> por <strong>Miguel</strong>
            </p>
        </footer>
    )
}