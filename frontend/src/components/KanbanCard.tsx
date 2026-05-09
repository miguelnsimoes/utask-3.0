interface Props {
    title: string
}

export function KanbanCard({title}: Props) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">

            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base">{title}</h3>
                <button>
                    <span className="material-icons">more_vert</span>
                </button>
            </div>

            <div className="flex items-center justify-between">
                <button className="text-sm flex items-center gap-1">
                    Ler descrição
                    <span className="material-icons text-sm">expand_more</span>
                </button>
                <button className="bg-primary-dark rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="material-icons text-white text-sm">chevron_right</span>
                </button>
            </div>

        </div>
    )
}