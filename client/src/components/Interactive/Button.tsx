import { ReactNode } from 'react'
import '../../css/interactive/button.css'
import { WebApp } from '../../App'

export interface IButton {
    children?: ReactNode
    onClick?: () => void
    className?: string
    id?: string
}

function Button({ children, onClick, className, id }: IButton) {
    function buttonClick(e: React.MouseEvent<HTMLElement>): void {
        e.preventDefault()
        WebApp.HapticFeedback.impactOccurred('medium')
        if (onClick) onClick()
    }
    return (
        <button
            id={id}
            className={`custom-button ${className}`}
            onClick={buttonClick}
        >
            {children}
        </button>
    )
}

export default Button
