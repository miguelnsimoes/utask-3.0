import logo from '../assets/logo.svg'

export function KanbanHeader() {
    return (
        <header className="w-full bg-primary-dark flex items-center h-20 relative px-10">
            
            <img src={logo} alt="uTask logo" className="w-60 h-8" />

            <h1 className="text-white text-2xl font-bold absolute left-1/2 -translate-x-1/2">uTask 3.0</h1>

            <div className="w-8 h-8 ml-auto" />

        </header>
    )
}