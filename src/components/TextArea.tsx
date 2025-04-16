export default function TextArea(props: {
    value: string,
    onChange: (value: string) => void,
    className?: string,
}) {
    const { value, onChange, className } = props

    return (
        <textarea
            value={value}
            className={`${className} p-1 border-2 border-gray-300 dark:border-stone-600 rounded-sm focus:border-green-300 transition-colors duration-100 outline-none shadow-none`}
            onChange={e => onChange(e.target.value)}
        />
    )
}