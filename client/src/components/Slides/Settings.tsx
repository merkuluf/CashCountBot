import { useEffect } from 'react'
import { WebApp } from '../../App'

function Settings() {
    useEffect(() => {
        WebApp.MainButton.hide()
    }, [])
    return <div>Settings</div>
}

export default Settings
