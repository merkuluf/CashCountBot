import { Wallet } from '../../../types/User'
import Button from '../../Interactive/Button'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../redux/modalSlice'

interface IWallets {
    wallets: Wallet[]
    exist: boolean
}

function Wallets({ wallets, exist }: IWallets) {
    const dispatch = useDispatch()
    function handleOpenModal() {
        dispatch(openModal('create-wallet'))
    }

    if (!exist)
        return (
            <div className='center'>
                <p className='custom-text'>У вас еще нет кошельков</p>
                <Button onClick={handleOpenModal}>Создать кошелек</Button>
            </div>
        )
    return wallets.map((wallet) => (
        <div className='center'>
            {wallet.currency}
            {wallet.amount}
        </div>
    ))
}

export default Wallets
