import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import { closeModal } from '../../../redux/modalSlice'
import '../../../css/ui/modal.css'
import { WebApp } from '../../../App'
import SmallButton from '../../Interactive/SmallButton'

const Modal: React.FC = () => {
    const { isOpen, type } = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch()

    const handleClose = () => {
        WebApp.HapticFeedback.impactOccurred('soft')
        dispatch(closeModal())
    }

    return (
        <div
            className={`modal-bg ${
                isOpen ? 'modal-bg-open' : 'modal-bg-close'
            }`}
        >
            <div
                className={`modal-content ${
                    isOpen ? 'content-open' : 'content-close'
                }`}
            >
                {type === 'create-wallet' && <div>Create Wallet Content</div>}
                {type === 'info' && <div>Info Content</div>}
                <SmallButton
                    className={`modal-close-button ${
                        isOpen ? '' : 'modal-close-button-inactive'
                    }`}
                    onClick={handleClose}
                >
                    X
                </SmallButton>
            </div>
        </div>
    )
}

export default Modal
