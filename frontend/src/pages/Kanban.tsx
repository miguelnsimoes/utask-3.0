import { useEffect, useState } from 'react' 
import { KanbanHeader } from '../components/KanbanHeader'
import { QuoteCard } from '../components/QuoteCard'
import { KanbanColumn } from '../components/KanbanColumn'
import { Footer } from '../components/Footer'
import { getCards, updateCard, deleteCard } from '../services/cards'
import type { Card } from '../services/cards'

export function Kanban() {
    const [cards, setCards] = useState<Card[]>([]) 

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
            
            setCards(cards.map(c => 
                c.id === cardId ? { ...c, column: nextColumn } : c
            ))
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
            setCards(cards.map(c => 
                c.id === cardId ? { ...c, column: previousColumn } : c
            ))
        } 
        catch (error) {
            console.error('erro voltar card:', error)
        }
    }

    const handleReturnToTodo = async (cardId: number) => {
        const card = cards.find(c => c.id === cardId)
        if (!card) return

        try {
            await updateCard(cardId, {column: 'todo'})
            setCards(cards.map(c => 
                c.id === cardId ? { ...c, column: 'todo' } : c
            ))
        } catch (error) {
            console.error('erro retornar card para a fazer:', error)
        }
    }

    const handleDeleteCard = async (cardId: number) => {
        try {
            await deleteCard(cardId)
            setCards(cards.filter(c => c.id !== cardId))
        } 
        catch (error) {
            console.error('erro ao deletar card:', error)
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <KanbanHeader />
            <QuoteCard />

            <div className="flex flex-1 gap-15 px-40 py-10">
                <KanbanColumn
                    title="A fazer"
                    showAdd
                    cards={cards.filter(card => card.column === 'todo')}
                    onMoveCard={handleMoveCard}
                    onDeleteCard={handleDeleteCard}
                />

                <KanbanColumn
                    title="Em andamento"
                    cards={cards.filter(card => card.column === 'doing')}
                    onMoveCard={handleMoveCard}
                    onMoveBack={handleBackCard}
                    onDeleteCard={handleDeleteCard}
                />

                <KanbanColumn
                    title="Feito"
                    cards={cards.filter(card => card.column === 'done')}
                    onMoveBack={handleBackCard}
                    onReturn={handleReturnToTodo}
                    onDeleteCard={handleDeleteCard}
                />
            </div>

            <Footer />
        </div>
    )
}