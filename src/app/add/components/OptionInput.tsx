import TextInput from "@/components/TextInput"
import { Check, Trash, X } from "lucide-react"

export default function OptionInput(props: {
    value: string,
    isAnswer: boolean,
    removeThis: () => void
    onChange: (value: string) => void
    toggleIsAnswer: () => void
}) {
    const { value, isAnswer, removeThis, onChange, toggleIsAnswer } = props

    return (
        <div className="flex items-center mb-1">
            <button className="mr-2" onClick={removeThis}><Trash /></button>
            <TextInput className="mr-4 flex-1 max-w-2xl" value={value} onChange={onChange} />
            <IsAnswerToggleButton
                isAnswer={isAnswer}
                onClick={toggleIsAnswer}
            />
        </div>
    )
}

function IsAnswerToggleButton(props: {
    isAnswer: boolean
    onClick: () => void
}) {
    const { isAnswer, onClick } = props

    return (
        <button onClick={onClick} className={`${isAnswer ? 'text-green-500' : 'text-red-500'}`}>
            {isAnswer ? <Check /> : <X />}
        </button>
    )
}