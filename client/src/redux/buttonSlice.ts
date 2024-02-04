import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IMainButtonState {
    isActive: boolean
}

const initialState: IMainButtonState = {
    isActive: false,
}

export const buttonSlice = createSlice({
    name: 'mainButton',
    initialState,
    reducers: {
        setMainButton: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload
        },
    },
})

export const { setMainButton } = buttonSlice.actions
export default buttonSlice.reducer
