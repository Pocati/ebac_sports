import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './carrinhoSlice'
import { produtosApi } from './produtosAPI'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [produtosApi.reducerPath]: produtosApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(produtosApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector