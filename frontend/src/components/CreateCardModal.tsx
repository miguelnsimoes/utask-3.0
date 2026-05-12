import { useState } from 'react'
import fechar from '../assets/Fechar.svg'

interface Props {
    onClose: () => void
}

export function CreateCardModal({ onClose }: Props) {
    const [form, setForm] = useState({
        title: '',
        description: ''
    })

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 sm:p-10 w-full max-w-lg">

                <div className="relative flex items-center justify-center mb-8">
                    <h2 className="text-[22px] font-bold text-primary-dark border-b-[3px] border-primary-dark pb-1 px-1">
                        Nova Task
                    </h2>
                    <button onClick={onClose} className="absolute right-0">
                        <img src={fechar} alt="fechar" className="w-8 h-8" />
                    </button>
                </div>

                <label className="text-sm font-poppins-poppins-semibold mb-2 block">Título *</label>
                <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="rounded-xl px-4 py-3.5 outline-none bg-gray-100 text-gray-700 w-full mb-5 placeholder:text-gray-500"
                />

                <label className="text-sm font-poppins-semibold mb-2 block">Descrição</label>
                <textarea
                    value={form.description} 
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className="rounded-xl px-4 py-3.5 outline-none bg-gray-100 text-gray-700 w-full h-32 resize-none mb-8 placeholder:text-gray-500" 
                />

                <button className="bg-primary-dark text-white py-3.5 rounded-full font-semibold w-full hover:bg-primary-navy transition">
                    Criar task
                </button>

            </div>
        </div>
    )
}