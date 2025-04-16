'use client'

export function TagButton(props: {
    size?: 'xs' | 'md',
    onClick?: () => void,
    children?: React.ReactNode
}) {
    const { size, onClick, children } = props

    let textSize = 'md'
    switch (size) {
        case 'xs':
            textSize = 'text-xs'
            break
        case 'md':
            textSize = 'text-md'
            break
    }

    return (
        <button
            className={
                `inline-block 
                bg-gray-300 hover:bg-gray-400 dark:bg-stone-700 hover:dark:bg-stone-600 
                rounded-sm px-2 py-1.5 mr-2 ${textSize}
                transition-colors duration-100`
            }
            onClick={() => { if (onClick) onClick() }}
        >
            {children}
        </button>
    )
}