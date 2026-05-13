import { useEffect, useState } from 'react' 
import { KanbanHeader } from '../components/KanbanHeader'
import { QuoteCard } from '../components/QuoteCard'
import { KanbanColumn } from '../components/KanbanColumn'
import { Footer } from '../components/Footer'
import { getCards, updateCard } from '../services/cards'
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
                />

                <KanbanColumn
                    title="Em andamento"
                    cards={cards.filter(card => card.column === 'doing')}
                    onMoveCard={handleMoveCard}
                />

                <KanbanColumn
                    title="Feito"
                    cards={cards.filter(card => card.column === 'done')}
                    onMoveCard={handleMoveCard}
                />
            </div>

            <Footer />
        </div>
    )
}