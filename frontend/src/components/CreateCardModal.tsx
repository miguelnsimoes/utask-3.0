import fechar from '../assets/Fechar.svg' // NOVO

interface Props {
    onClose: () => void
}

export function CreateCardModal({ onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-primary-dark underline">Nova Task</h2>
                    <button onClick={onClose}> 
                        <img src={fechar} alt="fechar" className="w-8 h-8" />
                    </button>
                </div>

                <label className="text-sm font-semibold mb-1 block">Título *</label>
                <input
                    type="text"
                    placeholder="Enviar depoimento para o site da Unect"
                    className="border rounded-lg px-4 py-3 outline-none bg-gray-50 focus:border-primary w-full mb-4"
                />

                <label className="text-sm font-semibold mb-1 block">Descrição</label>
                <textarea
                    placeholder="Eu achava que precisava entrar na Unect..."
                    className="border rounded-lg px-4 py-3 outline-none bg-gray-50 focus:border-primary w-full h-32 resize-none mb-6"
                />

                <button className="bg-primary-dark text-white py-3 rounded-full font-semibold w-full hover:bg-primary-navy transition">
                    Criar task
                </button>

            </div>
        </div>
    )
}