import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { RarityEnum, RarityTypes } from '@/types/Rarity'

export interface Cathlete {
	id: string
	rarity: RarityTypes
	level: number
	validated: boolean
}

const initCathlete = { id: nanoid(), rarity: RarityEnum.COMMON, level: 0, validated: false }

const initialState: Cathlete[] = [initCathlete]

export const cathleteSlice = createSlice({
	name: 'cathlete',
	initialState,
	reducers: {
		addCathlete: (state) => {
			return [...state, { ...initCathlete, id: nanoid() }]
		},
		onChangeRarity: (state, { payload }: PayloadAction<{ id: string; value: RarityTypes }>) => {
			const goodCath = state.find((cat) => cat.id === payload.id)

			if (goodCath) {
				goodCath.rarity = payload.value
			}
		},
		onChangeLevel: (state, { payload }: PayloadAction<{ id: string; value: string }>) => {
			const goodCath = state.find((cat) => cat.id === payload.id)

			if (goodCath) {
				goodCath.level = parseInt(payload.value)
			}
		},
		validateCathlete: (state, { payload }: PayloadAction<string>) => {
			const goodCath = state.find((cat) => cat.id === payload)

			if (goodCath) {
				goodCath.validated = true
			}
		},
	},
})

export const { addCathlete, onChangeRarity, onChangeLevel, validateCathlete } = cathleteSlice.actions

export default cathleteSlice.reducer
