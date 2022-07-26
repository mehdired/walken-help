import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { RarityTypes } from '@/types/Rarity'

export interface Cathlete {
	id: string
	rarity: RarityTypes
	level: number
}

const initCathlete = { id: nanoid(), rarity: 'Common', level: 0 }

const initialState: Cathlete[] = [initCathlete]

export const cathleteSlice = createSlice({
	name: 'cathlete',
	initialState,
	reducers: {
		addCathlete: (state) => {
			return [...state, { ...initCathlete, id: nanoid() }]
		},
		onChangeInput: (state, { payload }: PayloadAction<{ id: string; value: string; inputType: string }>) => {
			const goodCath = state.find((cat) => cat.id === payload.id)
			console.log(payload)
			if (goodCath) {
				if (payload.inputType === 'rarity') goodCath.rarity = payload.value
				if (payload.inputType === 'level') goodCath.level = parseInt(payload.value)
			}
		},
	},
})

export const { addCathlete, onChangeInput } = cathleteSlice.actions

export default cathleteSlice.reducer
