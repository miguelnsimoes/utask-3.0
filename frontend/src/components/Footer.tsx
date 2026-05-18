import favorite from '../assets/favorite.svg'

interface Props {
    darkMode: boolean
}

export function Footer({ darkMode }: Props) {
    return (
        <footer
            className={`w-full shrink-0 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 sm:gap-0 px-4 sm:px-16 py-4 text-center sm:text-left ${
                darkMode ? 'bg-[#111111]' : 'bg-primary-darker'
            }`}>
            <p className="text-white text-sm">
                © Processo de Trainee <strong>Unect Jr.</strong>
            </p>
            <p className="text-white text-sm flex items-center justify-center gap-1">
                Feito com <img src={favorite} alt="coração" className="w-4 h-4" /> por <strong>Miguel</strong>
            </p>
        </footer>
    )
}
