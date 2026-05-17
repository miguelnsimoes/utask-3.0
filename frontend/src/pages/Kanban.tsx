import { useEffect, useState } from 'react' 
import { KanbanHeader } from '../components/KanbanHeader'
import { QuoteCard } from '../components/QuoteCard'
import { KanbanColumn } from '../components/KanbanColumn'
import { Footer } from '../components/Footer'
import { getCards, updateCard, deleteCard } from '../services/cards'
import type { Card } from '../services/cards'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'

export function Kanban() {
    const [cards, setCards] = useState<Card[]>([])
    const [activeColumn, setActiveColumn] = useState(0)
    
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true'
    })

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode)
    }, [darkMode])

    useEffect(() => { 
        async function loadCards() { 
            try {
                const data = await getCards()
                setCards(data) 
            }
            catch (error) { 
                console.error('Erro ao buscar cards:', error) 
            }
        }
        loadCards() 
    }, []) 

    const handleMoveCard = async (cardId: number) => {
        const card = cards.find(c => c.id === cardId)
        if (!card) return
        const columnSequence = {todo: 'doing', doing: 'done', done: 'todo'}
        const nextColumn = columnSequence[card.column as keyof typeof columnSequence]
        try {
            await updateCard(cardId, {column: nextColumn})
            setCards(cards.map(c => c.id === cardId ? { ...c, column: nextColumn } : c))
        } catch (error) {
            console.error('erro mover card:', error)
        }
    } 

    const handleBackCard = async (cardId: number) => {
        const card = cards.find(c => c.id === cardId)
        if (!card) return
        const previousColumn = card.column === 'done' ? 'doing' : card.column === 'doing' ? 'todo' : undefined
        if (!previousColumn) return
        try {
            await updateCard(cardId, {column: previousColumn})
            setCards(cards.map(c => c.id === cardId ? { ...c, column: previousColumn } : c))
        } catch (error) {
            console.error('erro voltar card:', error)
        }
    }

    const handleReturnToTodo = async (cardId: number) => {
        const card = cards.find(c => c.id === cardId)
        if (!card) return
        try {
            await updateCard(cardId, {column: 'todo'})
            setCards(cards.map(c => c.id === cardId ? { ...c, column: 'todo' } : c))
        } catch (error) {
            console.error('erro retornar card para a fazer:', error)
        }
    }

    const handleDeleteCard = async (cardId: number) => {
        try {
            await deleteCard(cardId)
            setCards(cards.filter(c => c.id !== cardId))
        } catch (error) {
            console.error('erro ao deletar card:', error)
        }
    }

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result

        if (!destination) return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return

        const sourceId = source.droppableId.replace('-desktop', '').replace('-mobile', '')
        const destId = destination.droppableId.replace('-desktop', '').replace('-mobile', '')
        const cardId = Number(draggableId.replace('-desktop', '').replace('-mobile', ''))

        const newColumn = destId
        const currentCards = [...cards]

        if (sourceId !== destId) {
            setCards(prevCards => prevCards.map(c => c.id === cardId ? { ...c, column: newColumn } : c))
            
            try {
                await updateCard(cardId, { column: newColumn })
            } catch (error) {
                console.error('Erro ao mover card via drag and drop:', error)
                setCards(currentCards)
            }
        } else {
            const colCards = currentCards.filter(c => c.column === sourceId)
            const [movedCard] = colCards.splice(source.index, 1)
            colCards.splice(destination.index, 0, movedCard)

            const otherCards = currentCards.filter(c => c.column !== sourceId)
            setCards([...otherCards, ...colCards]) 
        }
    }

    const columns = [
        {
            id: 'todo',
            title: 'A fazer',
            showAdd: true,
            cards: cards.filter(card => card.column === 'todo'),
            onMoveCard: handleMoveCard,
            onMoveBack: undefined,
            onReturn: undefined,
            onDeleteCard: handleDeleteCard,
        },
        {
            id: 'doing',
            title: 'Em andamento',
            showAdd: false,
            cards: cards.filter(card => card.column === 'doing'),
            onMoveCard: handleMoveCard,
            onMoveBack: handleBackCard,
            onReturn: undefined,
            onDeleteCard: handleDeleteCard,
        },
        {
            id: 'done',
            title: 'Feito',
            showAdd: false,
            cards: cards.filter(card => card.column === 'done'),
            onMoveCard: undefined,
            onMoveBack: handleBackCard,
            onReturn: handleReturnToTodo,
            onDeleteCard: handleDeleteCard,
        },
    ]

    return (
        <div className={`flex flex-col h-dvh overflow-hidden ${darkMode ? 'bg-dark-back' : 'bg-gray-50'}`}> 
            <KanbanHeader darkMode={darkMode} setDarkMode={setDarkMode} />
            <QuoteCard darkMode={darkMode} />

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="hidden sm:flex flex-1 min-h-0 overflow-hidden gap-15 px-40 py-10">
                    {columns.map((col, i) => (
                        <KanbanColumn
                            key={i}
                            columnId={col.id}
                            viewPrefix="desktop"
                            title={col.title}
                            showAdd={col.showAdd}
                            cards={col.cards}
                            onMoveCard={col.onMoveCard}
                            onMoveBack={col.onMoveBack}
                            onReturn={col.onReturn}
                            onDeleteCard={col.onDeleteCard}
                            darkMode={darkMode}
                        />
                    ))}
                </div>

                <div className="flex sm:hidden flex-1 min-h-0 flex-col overflow-hidden px-2 pb-2">
                    <div className="flex flex-1 min-h-0 items-stretch gap-1 overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setActiveColumn(prev => Math.max(0, prev - 1))}
                            disabled={activeColumn === 0}
                            className={`shrink-0 self-center text-primary-dark ${activeColumn === 0 ? 'opacity-20' : ''}`}>
                            <span className="material-icons text-3xl">chevron_left</span>
                        </button>

                        <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
                            <KanbanColumn
                                columnId={columns[activeColumn].id}
                                viewPrefix="mobile"
                                title={columns[activeColumn].title}
                                showAdd={columns[activeColumn].showAdd}
                                cards={columns[activeColumn].cards}
                                onMoveCard={columns[activeColumn].onMoveCard}
                                onMoveBack={columns[activeColumn].onMoveBack}
                                onReturn={columns[activeColumn].onReturn}
                                onDeleteCard={columns[activeColumn].onDeleteCard}
                                darkMode={darkMode}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => setActiveColumn(prev => Math.min(columns.length - 1, prev + 1))}
                            disabled={activeColumn === columns.length - 1} 
                            className={`shrink-0 self-center text-primary-dark ${activeColumn === columns.length - 1 ? 'opacity-20' : ''}`}>
                            <span className="material-icons text-3xl">chevron_right</span>
                        </button>
                    </div>

                    <div className="flex shrink-0 items-center justify-center gap-2 py-3"> 
                        {columns.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveColumn(i)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    activeColumn === i ? 'bg-primary-dark' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </DragDropContext>

            <Footer darkMode={darkMode} />
        </div>
    )
}