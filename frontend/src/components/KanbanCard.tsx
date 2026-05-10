import { useState } from 'react' 

interface Props {
    title: string
    description: string
}
export function KanbanCard({title, description}: Props) {
    const [expanded, setExpanded] = useState(false) 

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">

            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base">{title}</h3>
                <button>
                    <span className="material-icons">more_vert</span>
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

                <button className="bg-primary-dark rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="material-icons text-white text-sm">chevron_right</span>
                </button>

            </div> 

            {expanded && ( 
                <p className="text-sm mt-2">{description}</p>
            )}

        </div>
    )
}