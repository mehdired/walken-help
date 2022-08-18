import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import coinReducer from '@features/CoinSlice'
import cathleteReducer from '@features/CathleteSlice'
import saveDataReducer from '@features/SaveDataSlice'

export const store = configureStore({
	reducer: {
		coin: coinReducer,
		cathlete: cathleteReducer,
		saveData: saveDataReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
