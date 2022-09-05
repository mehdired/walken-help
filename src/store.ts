import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import coinReducer from '@features/CoinSlice'
import cathleteReducer from '@features/CathleteSlice'
import saveDataReducer from '@features/SaveDataSlice'
import wayChoiceSlice from '@features/WayChoiceSlice'
import walletSlice from '@features/WalletSlice'

export const store = configureStore({
	reducer: {
		coin: coinReducer,
		cathlete: cathleteReducer,
		saveData: saveDataReducer,
		wayChoice: wayChoiceSlice,
		wallet: walletSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
