'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const root = document.body
        if (isDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [isDark])

    return (
        <button
            onClick={() => setIsDark(prev => !prev)}
            className="border-2 px-2 py-1 rounded-sm"
        >
            {
                isDark ? (
                    <><Moon className='inline-block' /> Dark</>
                ) : (
                    <><Sun className='inline-block' /> Light</>
                )
            }
        </button>
    )
}