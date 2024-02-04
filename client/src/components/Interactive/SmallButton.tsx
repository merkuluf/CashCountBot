import '../../css/interactive/smallbutton.css'
import { WebApp } from '../../App'
import { IButton } from './Button'

function SmallButton({ children, onClick, className, id }: IButton) {
    function buttonClick(e: React.MouseEvent<HTMLElement>): void {
        e.preventDefault()
        WebApp.HapticFeedback.impactOccurred('medium')
        if (onClick) onClick()
    }
    return (
        <button
            id={id}
            className={`custom-small-button ${className}`}
            onClick={buttonClick}
        >
            {children}
        </button>
    )
}

export default SmallButton
