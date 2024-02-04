interface IMessageProps {
    text: string
}

function Message({ text }: IMessageProps) {
    return <div>{text}</div>
}

export default Message
