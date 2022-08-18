import { Cathlete } from '@/types/Cathletes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const saveSlice = createSlice({
	name: 'saveData',
	initialState: { saving: false },
	reducers: {
		onChangeCheckbox: (state, { payload }: PayloadAction<boolean>) => {
			state.saving = payload
		},

		savingData: (state, { payload }: PayloadAction<Cathlete[]>) => {
			if (state.saving) {
				window.localStorage.setItem('wh-cath', JSON.stringify(payload))
			}
		},
	},
})

export const { onChangeCheckbox, savingData } = saveSlice.actions

export default saveSlice.reducer
