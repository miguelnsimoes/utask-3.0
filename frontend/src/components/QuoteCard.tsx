import { useState, useEffect } from 'react' 
import lampada from '../assets/tips_and_updates.svg'
import lampadaBranca from '../assets/tips_and_updates-dark.svg'

interface Props {
    darkMode: boolean
}

export function QuoteCard({ darkMode }: Props) {
    const [quote, setQuote] = useState('Carregando frase...') 

    useEffect(() => { 
        async function fetchQuote() {
            try {
                const res = await fetch('https://api.adviceslip.com/advice', { cache: 'no-cache' }) 
                const data = await res.json()
                const texto = data.slip.advice

                const translated = await fetch( 
                    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`
                )
                const translatedData = await translated.json() 
                setQuote(translatedData.responseData.translatedText) 
            } catch {
                setQuote('Não foi possível carregar a frase do dia.')
            }
        }

        fetchQuote()
    }, [])

    return (
        <div className={`ml-40 mt-10 w-1/2 rounded-3xl p-6 flex items-start gap-4 shadow-md ${darkMode ? 'bg-[#3D3D3D]' : 'bg-white'}`}>
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full flex-shrink-0 -mt-4"
                style={{ backgroundColor: darkMode ? '#515151' : '#FFFCEE' }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ backgroundColor: darkMode ? '#3D3D3D' : '#FFF5C0' }}>
                    <img src={darkMode ? lampadaBranca : lampada} alt="lâmpada" className="w-6 h-6" />
                </div>
            </div> 
            <div className="-mt-2">
                <p className={`font-bold text-base mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Frase do dia</p>
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>{quote}</p>
            </div>
        </div>
    )
}