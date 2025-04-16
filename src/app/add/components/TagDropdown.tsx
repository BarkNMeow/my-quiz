import { Tag } from "@/prisma";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function TagDropdown(props: {
    tag: Tag[],
    showTagInput: () => void,
    addTag: (tag: Tag) => void,
}) {
    const { tag, showTagInput, addTag } = props

    const ref = useRef<HTMLDivElement>(null)
    const [isShown, setIsShown] = useState(false)

    useEffect(() => {
        const callback = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsShown(false)
            }
        }

        window.addEventListener('mousedown', callback)

        return () => window.removeEventListener('mousedown', callback)
    })

    return (
        <div ref={ref} className="inline-block">
            <button
                className={`px-2 py-1 border-2 rounded-sm ${isShown ? 'bg-gray-100 dark:bg-stone-800' : ''} hover:bg-gray-100 dark:hover:bg-stone-800 transition-colors duration-100`}
                onClick={() => setIsShown(v => !v)}
            >
                <Plus className="inline-block" /> Add
            </button>
            {
                isShown && (
                    <div className="relative">
                        <div className="absolute w-fit h-max-2xl top-1 border-2 rounded-sm">
                            {
                                tag.map((v, i) =>
                                    <TagDropdownOption key={i} onClick={() => { addTag(v); setIsShown(false) }}>{v.text}</TagDropdownOption>
                                )
                            }
                            <div className="border-t-1 border-gray-300 dark:border-stone-600" />
                            <TagDropdownOption onClick={() => { showTagInput(); setIsShown(false) }}>New tag</TagDropdownOption>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export function TagDropdownOption(props: {
    onClick?: () => void,
    children?: React.ReactNode
}) {
    const { onClick, children } = props

    return (
        <div
            className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-stone-800 transition-colors duration-100 text-nowrap"
            onClick={() => { if (onClick) onClick(); }}
        >
            {children}
        </div>
    )
}