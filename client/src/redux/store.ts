import { configureStore } from '@reduxjs/toolkit'
import api from './api'
import buttonReducer from './buttonSlice'
import modalReducer from './modalSlice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        mainButton: buttonReducer,
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export default store
