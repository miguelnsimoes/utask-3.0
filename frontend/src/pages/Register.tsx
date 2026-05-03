import { Header } from '../components/Header'
import illustration from '../assets/Ilustração.svg'

export function Register() {
    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className='flex flex-1'>
                <div className="w-1/2 flex justify-center pt-20 px-10">
                    
                    <div className="w-full max-w-md flex flex-col">
                        
                        <div className="flex flex-col items-center mb-10">
                            <h1 className="text-5xl font-bold text-primary-dark mb-4">uTask 3.0</h1>
                            <div className="w-64 border-b border-gray-400"></div>
                        </div>

                        <div className='flex flex-col w-full'>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Crie uma conta</h2>
                            
                            <label className='text-sm mb-1 font-poppins font-normal'>Nome de usuário</label>
                            <input 
                                type="text" 
                                placeholder='Seu nome de usuário'
                                className='border border-gray-400 rounded-lg px-4 py-3 mb-4 outline-none bg-blue-50 focus:border-primary'
                            />
                        </div>

                    </div>
                </div>

                <div className="w-px bg-primary h-3/4 self-center"></div>

                <div className="w-1/2 flex items-center justify-center">
                    <img src={illustration} alt="ilustração" className="w-3/4" />
                </div>

            </div>
        </div>
    )
}