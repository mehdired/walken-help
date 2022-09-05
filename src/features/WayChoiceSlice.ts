import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { isWallet: null | boolean } = {
	isWallet: null,
}

export const wayChoiceSlice = createSlice({
	name: 'wayChoice',
	initialState,
	reducers: {
		onClickChoiceButton: (state, { payload }: PayloadAction<boolean>) => {
			state.isWallet = payload
		},
	},
})

export const { onClickChoiceButton } = wayChoiceSlice.actions

export default wayChoiceSlice.reducer
