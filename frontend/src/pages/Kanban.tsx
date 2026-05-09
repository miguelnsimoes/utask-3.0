import { KanbanHeader } from '../components/KanbanHeader'
import { QuoteCard } from '../components/QuoteCard'
import { KanbanColumn } from '../components/KanbanColumn'

export function Kanban() {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <KanbanHeader />
            <QuoteCard />
            <div className="flex flex-1 gap-15 px-40 py-10"> 
                <KanbanColumn title="A fazer" showAdd />
                <KanbanColumn title="Em andamento" />
                <KanbanColumn title="Feito" />
            </div>
        </div>
    )
}