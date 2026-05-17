import { useState, useEffect } from 'react'
import lampada from '../assets/tips_and_updates.svg'
import lampadaBranca from '../assets/tips_and_updates-dark.svg'
import fechar from '../assets/Fechar.svg' 

interface Props {
    darkMode: boolean
}

export function QuoteCard({ darkMode }: Props) {
    const [quote, setQuote] = useState('Carregando frase...')
    const [showModal, setShowModal] = useState(false) 

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
        <>

            <button
                type="button"
                onClick={() => setShowModal(true)}
                className="sm:hidden shrink-0 mx-4 mt-4 w-[calc(100%-2rem)] rounded-2xl py-3.5 flex items-center justify-center gap-2 shadow-sm font-semibold text-gray-900 bg-yellow-main"
            >
                <img src={lampada} alt="" className="w-5 h-5" />
                Frase do dia
            </button>


            <div className={`hidden sm:flex mx-4 sm:ml-40 mt-6 sm:mt-10 w-auto sm:w-1/2 rounded-3xl p-6 items-start gap-4 shadow-md ${darkMode ? 'bg-[#3D3D3D]' : 'bg-white'}`}>
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full shrink-0"
                    style={{ backgroundColor: darkMode ? '#515151' : '#FFFCEE' }}
                >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full"
                        style={{ backgroundColor: darkMode ? '#3D3D3D' : '#FFF5C0' }}
                    >
                        <img src={darkMode ? lampadaBranca : lampada} alt="lâmpada" className="w-6 h-6" />
                    </div>
                </div>
                <div>
                    <p className={`font-bold text-base mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Frase do dia</p>
                    <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>{quote}</p>
                </div>
            </div>


            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6 sm:hidden">
                    <div className={`rounded-3xl p-6 w-full max-w-sm relative ${darkMode ? 'bg-[#3d3d3d]' : 'bg-white'}`}>
                        <div className="flex items-center gap-3 mb-5 pr-10">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                                style={{ backgroundColor: darkMode ? '#515151' : '#FFFCEE' }}
                            >
                                <div className="flex items-center justify-center w-9 h-9 rounded-full"
                                    style={{ backgroundColor: darkMode ? '#3D3D3D' : '#FFF5C0' }}
                                >
                                    <img src={darkMode ? lampadaBranca : lampada} alt="" className="w-5 h-5" />
                                </div>
                            </div>
                            <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Frase do dia</p>
                        </div>
                        <button type="button" onClick={() => setShowModal(false)} className="absolute right-4 top-4">
                            <img src={fechar} alt="fechar" className="w-8 h-8" />
                        </button>
                        <p className={`text-sm text-center leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            {quote}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}