import '../../css/forms/registration.css'
import { WebApp, t_user, telegram_id } from '../../App'
import Input from '../Interactive/Input'
import { useState } from 'react'
import Button from '../Interactive/Button'
import { isValidUsername } from '../../utils/Validation'
import { useRegisterUserMutation } from '../../redux/api'
import Loading from '../States/Loading'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface IRegistration {
    refetchUser: () => void
}

function Registration({ refetchUser }: IRegistration) {
    const usernamePlaceholder =
        t_user.username.length > 0 ? '@' + t_user.username : '@username'

    const [nameInput, setNameInput] = useState<string>('')

    const [registerUser, { data: registrationData, isLoading: isRegistering }] =
        useRegisterUserMutation()

    function handleInputUsername(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        // Only add @ when the user starts typing again
        if (value === '') {
            setNameInput('')
        } else if (!value.startsWith('@')) {
            setNameInput('@' + value.replace(/@/g, ''))
        } else {
            setNameInput(value)
        }
    }

    async function handleRegistration() {
        const username = nameInput.length > 0 ? nameInput : usernamePlaceholder
        if (!isValidUsername(username)) {
            return WebApp.showPopup({
                title: 'Ошибка',
                message:
                    'Username может состоять из 5-14 символов и содержать только цифры и английские буквы ',
                buttons: [{ type: 'ok', text: 'ok' }],
            })
        }
        try {
            await registerUser({
                username: username,
                telegram_id: telegram_id,
            }).unwrap()

            refetchUser()
        } catch (e: any) {
            if (e.status === 409) {
                return WebApp.showPopup({
                    title: 'Ошибка',
                    message: e.data?.error || 'Ошибка на стороне сервера',
                    buttons: [{ type: 'ok', text: 'ok' }],
                })
            }
            console.error(e)
        }
    }

    if (isRegistering) return <Loading />

    return (
        <div className='registration'>
            <h1>Регистрация</h1>
            <form>
                <Input
                    name='name'
                    onChange={handleInputUsername}
                    value={nameInput}
                    placeholder={usernamePlaceholder}
                />
                <Button onClick={handleRegistration}>Регистрация</Button>
            </form>
        </div>
    )
}

export default Registration
