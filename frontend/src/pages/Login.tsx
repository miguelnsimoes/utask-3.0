import { Header } from '../components/Header'
import illustration from '../assets/Ilustração do login.png'

export function Login() {
  return (
  <div className="flex flex-col h-screen">
    <Header />
      
      <div className="flex flex-1">  

       <div className="w-1/2 flex items-center justify-center">
          <img src={illustration} alt="ilustração" className="w-3/4" />
       </div>

      <div className='w-px h-[601px] bg-blue-300 self-center'></div>

      <div className="w-1/2 flex flex-col items-center justify-start pt-22 px-20">
        <h1 className="w-[205px] h-[63px] text-5xl font-bold text-[#226ED8] mb-12">uTask 3.0</h1>
        
        <div className="flex flex-col w-full max-w-md">
          <label className="text-sm mb-1 font-poppins font-normal">E-mail</label>
          <input 
            type="email"
            placeholder="Endereço de e-mail"
            className="border rounded-lg px-4 py-3 mb-4 outline-none bg-blue-50 focus:border-blue-500"
          />
          <label className="text-sm mb-1 font-poppins font-normal">Senha</label>
          <input 
            type="password"
            placeholder="Senha secreta"
            className="border rounded-lg px-4 py-3 outline-none bg-blue-50 focus:border-blue-500"
          />

          <a href="#" className="text-sm text-blue-600 mt-2 mb-6 underline font-poppins font-normal">Esqueceu a senha?</a>

          <button className="bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition">Entrar</button>
          
            <hr className="my-8 w-32 mx-auto border-1 border-gray-400" />
            <p className="text-center text-sm underline font-poppins font-normal">Não tem cadastro  ? Crie uma conta</p>
        </div>

      </div>  

    </div>
  </div>
  )
}
