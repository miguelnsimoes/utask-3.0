import { Header } from '../components/Header'
import illustration from '../assets/Ilustração.svg'

export function Register(){
    return(
        <div className="flex flex-col h-screen">
            <Header />

            <div className='flex flex-1 justify-end'>
                <div className="w-1/2 flex items-center justify-center">
                    <img src={illustration} alt="ilustração" className="w-3/4" />
                </div>
            </div>
        </div>
    )
}