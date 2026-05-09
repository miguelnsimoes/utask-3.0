import { KanbanHeader } from '../components/KanbanHeader'
import { QuoteCard } from '../components/QuoteCard'

export function Kanban() {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <KanbanHeader />
            <QuoteCard />
        </div>
    )
}