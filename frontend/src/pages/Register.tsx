import { Header } from '../components/Header'
import illustration from '../assets/Ilustração.svg'
import { useState } from 'react'

export function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [form, setForm] = useState({ 
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className='flex flex-1'>
                <div className="w-1/2 flex justify-center pt-20 px-10">
                    
                    <div className="w-full max-w-md flex flex-col">
                        
                        <div className="flex flex-col items-center mb-10">
                            <h1 className="text-5xl font-bold text-primary-dark mb-4">uTask 3.0</h1>
                            <div className="w-48 border-b border-gray-400"></div>
                        </div>

                        <div className='flex flex-col w-full'>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Crie uma conta</h2>
                            
                            <label className='text-sm mb-1 font-poppins font-normal'>Nome de usuário</label>
                            <input 
                                type="text" 
                                placeholder='Seu nome de usuário'
                                value={form.username}
                                onChange={e => setForm({ ...form, username: e.target.value })}
                                className='border rounded-lg px-4 py-3 outline-none bg-blue-50 focus:border-primary w-full mb-4'
                            />

                            <label className='text-sm mb-1 font-poppins font-normal'>E-mail</label>
                            <input 
                                type="email" 
                                placeholder='Endereço de e-mail'
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })} 
                                className='border rounded-lg px-4 py-3 outline-none bg-blue-50 focus:border-primary w-full mb-4'
                            />

                            <label className='text-sm mb-1 font-poppins font-normal'>Senha</label>
                            <div className='relative'>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder='Senha secreta'
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                className='border rounded-lg px-4 py-3 outline-none bg-blue-50 focus:border-primary w-full mb-4'
                            />
                            <button type='button'
                            onClick={()=> setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-400">
                            <span className='material-icons'>
                                {showPassword ? 'visibility' : 'visibility_off'}
                            </span>  
                            </button>
                            </div>

                            <label className='text-sm mb-1 font-poppins font-normal'>Confirme a Senha</label>
                            <div className='relative'>
                            <input 
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Senha secreta'
                                value={form.confirmPassword} 
                                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                                className='border rounded-lg px-4 py-3 outline-none bg-blue-50 focus:border-primary w-full mb-9'
                            />
                            <button type='button'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-400">
                            <span className='material-icons'>
                                {showConfirmPassword ? 'visibility' : 'visibility_off'}
                            </span>  
                            </button>
                            </div>
                            
                            <button className="bg-primary-dark text-white py-3 rounded-full font-semibold hover:bg-primary-navy transition">Criar Cadastro</button>
                 
                        </div>

                    </div>
                </div>

                <div className='w-px bg-primary my-16'></div>

                <div className="w-1/2 flex items-center justify-center">
                    <img src={illustration} alt="ilustração" className="w-3/4" />
                </div>

            </div>
        </div>
    )
}