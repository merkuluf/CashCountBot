import '../../css/interactive/input.css'

interface IInput {
    placeholder?: string
    name?: string
    inputRef?: React.RefObject<HTMLInputElement>
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
}

function Input({
    placeholder,
    name,
    inputRef,
    className,
    onChange,
    value,
}: IInput) {
    return (
        <input
            className={`custom-input ${className}`}
            placeholder={placeholder}
            name={name}
            value={value}
            ref={inputRef}
            onChange={onChange}
        ></input>
    )
}

export default Input
