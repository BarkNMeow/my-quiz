import { Trash } from "lucide-react"
import { useRef, useState, useEffect } from "react"

export function TagInput(props: {
    addTag: (tag: string) => void
    hideInput: () => void
}) {
    const { addTag, hideInput } = props

    const ref = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState('')

    useEffect(() => {
        if (ref.current) {
            ref.current.focus()
        }
    })

    return (
        <div className="inline-block bg-gray-300 dark:bg-stone-700 rounded-sm px-2 py-1.5 mr-2">
            <input
                ref={ref}
                value={value}
                className="inline-block field-sizing-content min-w-2 mr-1 outline-none shadow-none"
                onChange={e => setValue(e.target.value)}
                onBlur={() => { addTag(value); hideInput() }}
            />
            <button onClick={hideInput}><Trash className="inline-block" /></button>
        </div>
    )
}