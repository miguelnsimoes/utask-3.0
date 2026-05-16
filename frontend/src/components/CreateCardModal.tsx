import { useState } from 'react'
import fechar from '../assets/Fechar.svg'
import { createCard } from '../services/cards'

interface Props {
    onClose: () => void
    darkMode: boolean 
}

export function CreateCardModal({ onClose, darkMode }: Props){
    const [form, setForm] = useState({
        title: '',
        description: ''
    })

    async function handleSubmit() {
        try {
            if (!form.title.trim()) {
                alert('O título é obrigatório.')
                return
            }
            await createCard(form.title, form.description, 'todo')
            onClose()
            window.location.reload()
        } 
        catch (error) {
            console.error('Erro ao criar card:', error)
            alert('Erro ao criar task.')
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className={`rounded-2xl p-8 sm:p-10 w-full max-w-lg ${darkMode ? 'bg-[#3d3d3d]' : 'bg-white'}`}>
                <div className="relative flex items-center justify-center mb-8">
                    <h2 className="text-[22px] font-bold text-primary-dark border-b-[3px] border-primary-dark pb-1 px-1">
                        Nova Task
                    </h2>
                    <button onClick={onClose} className="absolute right-0">
                        <img src={fechar} alt="fechar" className="w-8 h-8" />
                    </button>
                </div>

                <label className={`text-sm font-poppins-semibold mb-2 block ${darkMode ? 'text-white' : 'text-gray-900'}`}>Título *</label> 
                <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className={`rounded-xl px-4 py-3.5 outline-none w-full mb-5 placeholder:text-gray-500 ${darkMode ? 'bg-[#333333] text-white' : 'bg-gray-100 text-gray-700'}`}
                />

                <label className={`text-sm font-poppins-semibold mb-2 block ${darkMode ? 'text-white' : 'text-gray-900'}`}>Descrição</label> 
                <textarea
                    value={form.description} 
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className={`rounded-xl px-4 py-3.5 outline-none w-full h-32 resize-none mb-8 placeholder:text-gray-500 ${darkMode ? 'bg-[#333333] text-white' : 'bg-gray-100 text-gray-700'}`}
                />

                <button
                    onClick={handleSubmit}
                    className="bg-primary-dark text-white py-3.5 rounded-full font-semibold w-full hover:bg-primary-navy transition">
                    Criar task
                </button>

            </div>
        </div>
    )
}