import { useState } from 'react' 
import deleteIcon from '../assets/delete_outline.svg'

interface Props {
    id: number
    title: string
    description: string
    onDelete: () => void
    onMove: () => void
}

export function KanbanCard({id, title, description, onDelete, onMove}: Props) {
    const [expanded, setExpanded] = useState(false) 
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm relative">
            
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base">{title}</h3>
                <button onClick={() => setShowMenu(!showMenu)}>
                    <span className={`material-icons ${showMenu ? 'text-primary-dark' : 'text-gray-500'}`}>more_vert</span>
                </button>
            </div>

            <div className="flex items-center justify-between">
                <button
                    onClick={() => setExpanded(!expanded)} 
                    className={`text-sm flex items-center gap-1 ${expanded ? 'text-primary-dark' : 'text-gray-500'}`}>
                    {expanded ? 'Esconder descrição' : 'Ler descrição'}

                    <span className="material-icons text-sm">
                        {expanded ? 'expand_less' : 'expand_more'}
                    </span>
                    
                </button>

                <button 
                    onClick={onMove}
                    className="bg-primary-dark rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary-dark/80 transition-colors cursor-pointer">
                    <span className="material-icons text-white text-sm">chevron_right</span>
                </button>

            </div> 

            {showMenu && ( 
                <div className="absolute right-4 top-10 bg-white shadow-lg rounded-xl border border-gray-100 px-3 py-3 z-10"> {/* MUDOU */}
                    <button
                        onClick={() => {onDelete(); setShowMenu(false)}}
                        className="flex items-center gap-2 text-red-500 font-poppins text-sm">
                        <img src={deleteIcon} alt="excluir" className="w-4 h-4" />
                        Excluir
                    </button>
                </div>
            )}

            {expanded && ( 
                <p className="text-sm mt-2">{description}</p>
            )}

        </div>
    )
}