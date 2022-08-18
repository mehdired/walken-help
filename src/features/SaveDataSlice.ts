import { Cathlete } from '@/types/Cathletes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const LOCAL_STORAGE = 'wh-cath'

export const saveSlice = createSlice({
	name: 'saveData',
	initialState: { saving: false },
	reducers: {
		onChangeCheckbox: (state, { payload }: PayloadAction<boolean>) => {
			state.saving = payload

			if (!state.saving) window.localStorage.removeItem(LOCAL_STORAGE)
		},

		savingData: (state, { payload }: PayloadAction<Cathlete[]>) => {
			if (state.saving) {
				window.localStorage.setItem(LOCAL_STORAGE, JSON.stringify(payload))
			}
		},
	},
})

export const { onChangeCheckbox, savingData } = saveSlice.actions

export default saveSlice.reducer
