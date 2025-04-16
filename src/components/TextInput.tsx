export default function TextInput(props: {
    value: string,
    className?: string,
    onChange?: (value: string) => void
}) {
    const { value, className, onChange } = props
    return (
        <input
            value={value}
            className={`border-b-2 p-1 border-gray-300 dark:border-stone-600 focus:border-green-300 transition-colors duration-100 outline-none shadow-none ${className}`}
            onChange={e => { if (onChange) onChange(e.target.value) }}
        />
    )
}