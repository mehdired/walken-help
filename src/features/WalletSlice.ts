import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	address: '',
	submited: false,
}

export const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		onChangeWallet: (state, { payload }: PayloadAction<string>) => {
			state.address = payload
		},

		onSubmitWallet: (state) => {
			state.submited = true
		},
	},
})

export const { onChangeWallet, onSubmitWallet } = walletSlice.actions

export default walletSlice.reducer
