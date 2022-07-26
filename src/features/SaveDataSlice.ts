import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const LOCAL_STORAGE = 'wh-cath'

const initialState = { saving: false }

export const saveSlice = createSlice({
	name: 'saveData',
	initialState,
	reducers: {
		onChangeCheckbox: (state, { payload }: PayloadAction<boolean>) => {
			state.saving = payload

			if (!state.saving) window.localStorage.removeItem(LOCAL_STORAGE)
		},

		checkboxCheckedOnLoad: (state) => {
			if (window.localStorage.getItem(LOCAL_STORAGE)) {
				state.saving = true
			}
		},
	},
})

export const { onChangeCheckbox, checkboxCheckedOnLoad } = saveSlice.actions

export default saveSlice.reducer
