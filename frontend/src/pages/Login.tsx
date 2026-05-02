export function Login() {
  return (
    <div className="flex h-screen">
      
      <div className="w-1/2 bg-gray-100">
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">uTask 3.0</h1>
        
        <div className="flex flex-col w-80 mb-4">
          <label className="text-sm mb-1">E-mail</label>
          <input 
            type="email"
            placeholder="Endereço de e-mail"
            className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500 mb-4"
          />
          <label className="text-sm mb-1">Senha</label>
          <input 
            type="senha"
            placeholder="Senha secreta"
            className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500"
          />
          
        </div>
      </div>

    </div>
  )
}