interface Props{
    onClose: () => void
}

export function CreateCardModal({onClose}: Props){
    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            </div>
        </div>
    )
}