import { Header } from '../components/Header'
import illustration from '../assets/Ilustração do login.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/auth'

interface FormErrors{
  email?: string
  password?: string
}


export function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const[form, setForm] = useState({
    email: '',
    password: ''
  })

  function validate(): boolean { 
    const newErrors: FormErrors = {}

    if (!form.email.trim())
      newErrors.email = 'Digite um email'

    if (!form.password.trim())
      newErrors.password = 'Digite uma senha'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(){
    if(!validate())
      return

    try{
      const data = await loginUser(form.email, form.password)
      localStorage.setItem('token', data.token)
      navigate('/')
    }
    catch(err){
      const message = (err as Error).message

      if(message === 'Email incorreto'){
        setErrors({email: message})
      }
      else{
        setErrors({password: message})
      }
    }
  }

  const inputClass = (field: keyof FormErrors) =>
    `border rounded-lg px-4 py-3 outline-none w-full ${errors[field] ? 'border-red-400 bg-red-50 focus:border-red-400': 'bg-blue-50 focus:border-primary'}`

  return (
  <div className="flex flex-col h-screen">
    <Header />
      
      <div className="flex flex-1">  

       <div className="w-1/2 flex items-center justify-center">
          <img src={illustration} alt="ilustração" className="w-3/4" />
       </div>

      <div className='w-px bg-primary my-16'></div>

      <div className="w-1/2 flex flex-col items-center justify-start pt-22 px-20">
        <h1 className="text-5xl font-bold text-primary-dark mb-12">uTask 3.0</h1>
        
        <div className="flex flex-col w-full max-w-md">   
          <label className="text-sm mb-1 font-poppins font-normal">E-mail</label>
          <input 
            type="email"
            placeholder="Endereço de e-mail"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            className={inputClass('email')}
          />
        <p className="text-red-500 text-xs h-3 mb-2">{errors.email ?? ''}</p> 
        <label className="text-sm mb-1 font-poppins font-normal">Senha</label>
        <div className='relative'>
          <input 
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha secreta"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            className={inputClass('password')}
          />
          <button 
          type='button'
          onClick={()=> setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-400">
          <span className='material-icons'>
             {showPassword ? 'visibility' : 'visibility_off'}
          </span>   
          </button>
        </div>
          <p className="text-red-500 text-xs h-5 mb-2">{errors.password ?? ''}</p>
          <a href="#" className="text-sm text-primary-dark mt-2 mb-6 underline font-poppins font-normal">Esqueceu a senha?</a>

          <button 
          onClick={handleSubmit}
          className="bg-primary-dark text-white py-3 rounded-full font-semibold hover:bg-primary-navy transition">Entrar</button>
          
            <hr className="my-8 w-50 mx-auto border-1 border-gray-400" />
            <p onClick={() => navigate('/register')} className="text-center text-sm underline font-poppins font-normal">Não tem cadastro ? Crie uma conta</p>
        </div>

      </div>  

    </div>
  </div>
  )
}
