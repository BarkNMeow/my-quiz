'use client'

export default function RoundButton(props: {
    disabled?: boolean
    onClick?: () => void,
    className?: string,
    children?: React.ReactNode
}) {
    const { disabled, onClick, className, children } = props

    return (
        <button
            disabled={disabled === undefined ? false : disabled}
            className={`px-4 py-0.5
                border-2 border-black dark:border-stone-300 disabled:border-gray-200 dark:disabled:border-stone-800 rounded-md
                text-lg font-bold enabled:hover:text-white disabled:text-gray-200 dark:enabled:hover:text-stone-900 dark:disabled:text-stone-800
                bg-white dark:bg-stone-900 enabled:hover:bg-black dark:enabled:hover:bg-stone-300
                transition-colors duration-100 ${className}`}
            onClick={() => { if (onClick) onClick() }}
        >
            {children}
        </button>
    )

}