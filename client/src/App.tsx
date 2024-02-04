import { useValidateTelegramMutation } from './redux/api'
import { useEffect } from 'react'
import Loading from './components/States/Loading'
import Message from './components/States/Message'
import AppScreen from './components/AppScreen'
// @ts-ignores
export const WebApp = window.Telegram.WebApp
export const telegram_id = WebApp.initDataUnsafe.user.id.toString()
export const t_user = WebApp.initDataUnsafe.user

function App() {
    if (!WebApp.initData)
        return (
            <Message text='Это приложение можно использовать только в Telegram' />
        )

    const [
        validateTelegram,
        { data: validationData, isLoading: isValidating },
    ] = useValidateTelegramMutation()

    useEffect(() => {
        async function validate() {
            try {
                await validateTelegram({
                    initData: WebApp.initData,
                })
            } catch (error) {
                console.error(error)
            }
        }
        validate()
    }, [])

    if (isValidating) return <Loading />
    if (validationData === false)
        return <Message text='Не можем валидировать' />

    return <AppScreen />
}

export default App
