import { Header } from '../components/Header'
import illustration from '../assets/Ilustração.svg'

export function Register(){
    return(
        <div className="flex flex-col h-screen">
            <Header />

            <div className='flex flex-1'>
                <div className="w-1/2 flex items-start justify-center">
                    <div className="w-1/2 flex flex-col items-start justify-start pt-20 px-10">
                        <h1 className="text-5xl font-bold text-primary-dark mb-12">uTask 3.0</h1>
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