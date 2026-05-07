import { Header } from '../components/Header'
import { SuccessModal } from '../components/SuccessModal'
import illustration from '../assets/Ilustração.svg'
import { useState } from 'react'
import { registerUser } from '../services/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


interface FormErrors { 
    username?: string
    email?: string
    password?: string
    confirmPassword?: string 
}

export function Register() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const [form, setForm] = useState({ 
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    function validate(): boolean{
        const newErrors: FormErrors = {}

        if(!form.username.trim())
            newErrors.username = 'Digite um nome'

        if(!form.email.trim())
            newErrors.email = 'Digite um email'

        if(!form.password.trim())
            newErrors.password = 'Digite uma senha'

        if(!form.confirmPassword.trim())
            newErrors.confirmPassword = 'Confirme a senha'
        else if(form.password !== form.confirmPassword)
            newErrors.confirmPassword = 'Senhas não combinam, tente novamente.'
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
        
    }


    async function handleSubmit(){
        if(!validate())
            return

        try{
            await registerUser(form.username, form.email, form.password)
            setShowSuccessModal(true)
            setTimeout(() => {
               navigate('/')
          }, 2000)
        }
        catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) { 
                setErrors({ email: err.response.data.message })
            }
        }
    }



    const inputClass = (field: keyof FormErrors) => 
        `border rounded-lg px-4 py-3 outline-none w-full ${errors[field] 
            ? 'border-red-400 bg-red-50 focus:border-red-400' 
            : 'bg-blue-50 focus:border-primary'
        }`

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
                                className={inputClass('username')}
                            />
                            <p className="text-red-500 text-xs h-5 mb-2">
                                {errors.username ?? ''}
                            </p>

                            <label className='text-sm mb-1 font-poppins font-normal'>E-mail</label>
                            <input 
                                type="email" 
                                placeholder='Endereço de e-mail'
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })} 
                                className={inputClass('email')}
                            />
                            <p className="text-red-500 text-xs h-5 mb-2">
                                {errors.email ?? ''}
                            </p>
                            <label className='text-sm mb-1 font-poppins font-normal'>Senha</label>
                            <div className='relative'>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder='Senha secreta'
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                className={inputClass('password')}
                            />
                            <button type='button'
                            onClick={()=> setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-400">
                            <span className='material-icons'>
                                {showPassword ? 'visibility' : 'visibility_off'}
                            </span>  
                            </button>
                            </div>
                            <p className="text-red-500 text-xs h-5 mb-2">
                                {errors.password ?? ''}
                            </p>

                            <label className='text-sm mb-1 font-poppins font-normal'>Confirme a Senha</label>
                            <div className='relative'>
                            <input 
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Senha secreta'
                                value={form.confirmPassword} 
                                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                                className={inputClass('confirmPassword')}
                            />
                            <button type='button'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-400">
                            <span className='material-icons'>
                                {showConfirmPassword ? 'visibility' : 'visibility_off'}
                            </span>  
                            </button>
                            </div>
                            <p className="text-red-500 text-xs h-5 mb-2">
                                {errors.confirmPassword ?? ''}
                            </p>
                            
                            <button onClick={handleSubmit}
                            className="bg-primary-dark text-white py-3 rounded-full font-semibold hover:bg-primary-navy transition">Criar Cadastro</button>
                 
                        </div>

                    </div>
                </div>

                <div className='w-px bg-primary my-16'></div>

                <div className="w-1/2 flex items-center justify-center">
                    <img src={illustration} alt="ilustração" className="w-3/4" />
                </div>

            </div>

            <SuccessModal 
                    isOpen={showSuccessModal} 
                />

        </div>
    )
}