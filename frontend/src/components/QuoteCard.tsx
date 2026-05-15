import { useState, useEffect } from 'react' 
import lampada from '../assets/tips_and_updates.svg'

export function QuoteCard() {
    const [quote, setQuote] = useState('Carregando frase...') 

    useEffect(() => { 
        async function fetchQuote() {
            try {
                const res = await fetch('https://api.adviceslip.com/advice')
                const data = await res.json()
                setQuote(data.slip.advice)
            } catch {
                setQuote('Não foi possível carregar a frase do dia.')
            }
        }

        fetchQuote()
    }, [])

    return (
        <div className="ml-40 mt-10 w-1/2 rounded-3xl p-6 flex items-start gap-4 bg-white shadow-md">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full flex-shrink-0 -mt-4" style={{ backgroundColor: '#FFFCEE' }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: '#FFF5C0' }}>
                    <img src={lampada} alt="lâmpada" className="w-6 h-6" />
                </div>
            </div>
            <div className="-mt-2">
                <p className="font-bold text-base mb-2">Frase do dia</p>
                <p className="text-sm text-gray-700">{quote}</p>
            </div>
        </div>
    )
}