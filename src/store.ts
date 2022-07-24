import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import coinReducer from '@features/CoinSlice'
import cathleteReducer from '@features/CathleteSlice'

export const store = configureStore({
	reducer: {
		coin: coinReducer,
		cathlete: cathleteReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
