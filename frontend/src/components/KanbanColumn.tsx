import addTask from '../assets/Adicionar task.svg'
import { KanbanCard } from './KanbanCard'
import { useState } from 'react'
import { CreateCardModal } from './CreateCardModal'
import type { Card } from '../services/cards'

interface Props {
    title: string
    showAdd?: boolean
    cards: Card[]
}

export function KanbanColumn({title, showAdd, cards}: Props) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="flex flex-col flex-1">
            
            <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-2xl font-poppins">{title}</h2>
                {showAdd && (
                    <button onClick={() => setShowModal(true)}>
                        <img src={addTask} alt="adicionar" className="w-8 h-8" />
                    </button>
                )}
            </div>

            <div className="flex flex-col flex-1 bg-[#EEEEEE] p-4 rounded-xl shadow-sm gap-4"> 
                {cards.map(card => ( 
                    <KanbanCard
                        key={card.id} 
                        title={card.title} 
                        description={card.description} 
                        onDelete={() => console.log('deletar', card.id)} 
                    />
                ))} 
            </div>

            {showModal && (
                 <CreateCardModal onClose={() => setShowModal(false)} />
            )}

        </div>
    )
}