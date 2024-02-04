// redux/modalSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ModalState {
    isOpen: boolean
    type: 'create-wallet' | 'info' | null
    // Add any other properties you need for the modal
}

const initialState: ModalState = {
    isOpen: false,
    type: null,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalState['type']>) => {
            state.isOpen = true
            state.type = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false
            state.type = null
        },
    },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
