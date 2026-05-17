import addTask from '../assets/Adicionar task.svg'
import { KanbanCard } from './KanbanCard'
import { useState } from 'react'
import { CreateCardModal } from './CreateCardModal'
import type { Card } from '../services/cards'
import { Droppable, Draggable } from '@hello-pangea/dnd'

interface Props {
    columnId: string
    viewPrefix: string
    title: string
    showAdd?: boolean
    cards: Card[]
    onMoveCard?: (cardId: number) => void
    onMoveBack?: (cardId: number) => void
    onReturn?: (cardId: number) => void
    onDeleteCard: (cardId: number) => void
    darkMode: boolean 
}

export function KanbanColumn({columnId, viewPrefix, title, showAdd, cards, onMoveCard, onMoveBack, onReturn, onDeleteCard, darkMode}: Props) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="flex flex-col flex-1 min-h-0">

            <div className="flex items-center justify-between mb-3 px-1">
                <h2 className={`text-2xl font-poppins ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2> 
                {showAdd && (
                    <button onClick={() => setShowModal(true)}>
                        <img src={addTask} alt="adicionar" className="w-8 h-8" />
                    </button>
                )}
            </div>

            <Droppable droppableId={`${columnId}-${viewPrefix}`}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`kanban-column-scroll flex flex-col flex-1 min-h-0 overflow-y-auto p-4 rounded-xl shadow-sm gap-4 ${darkMode ? 'dark-scroll bg-[#333333]' : 'bg-mid-gray'}`}>
                        
                        {cards.map((card, index) => ( 
                            <Draggable key={`${card.id}-${viewPrefix}`} draggableId={`${card.id}-${viewPrefix}`} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <KanbanCard
                                            title={card.title} 
                                            description={card.description} 
                                            onDelete={() => onDeleteCard(card.id)}
                                            onMove={onMoveCard ? () => onMoveCard(card.id) : undefined}
                                            onMoveBack={onMoveBack ? () => onMoveBack(card.id) : undefined}
                                            onReturn={onReturn ? () => onReturn(card.id) : undefined}
                                            isDone={card.column === 'done'}
                                            darkMode={darkMode}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))} 
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {showModal && (
                 <CreateCardModal onClose={() => setShowModal(false)} darkMode={darkMode} />
            )}

        </div>
    )
}