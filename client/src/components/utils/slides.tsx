import Home from '../Slides/Home'
import Settings from '../Slides/Settings'
import { ReactNode } from 'react'

interface Slide {
    name: string
    element: ReactNode
}

export const slides: Slide[] = [
    {
        name: 'Home',
        element: <Home />,
    },
    {
        name: 'Settings',
        element: <Settings />,
    },
]
