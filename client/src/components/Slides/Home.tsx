import '../../css/slides/home.css'
import Profile from '../UI/Profile/Profile'
import { WebApp, telegram_id } from '../../App'
import { useGetUserQuery } from '../../redux/api'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Wallets from '../UI/Profile/Wallets'

function Home() {
    const { data: user } = useGetUserQuery(telegram_id)
    const buttonActive = useSelector(
        (state: RootState) => state.mainButton.isActive
    )

    const walletsExist = user!.wallets!.length > 0

    useEffect(() => {
        if (buttonActive && walletsExist) {
            WebApp.MainButton.text = 'Изменить баланс'
            WebApp.MainButton.show()
        } else {
            WebApp.MainButton.hide()
        }
    }, [buttonActive, walletsExist])

    return (
        <div className='home'>
            <Profile />
            <Wallets exist={walletsExist} wallets={user!.wallets} />
        </div>
    )
}

export default Home
