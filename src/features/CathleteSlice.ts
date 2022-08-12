import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { RarityTypes } from '@/types/Rarity'
import { EnergyType, energy } from '@/types/Energy'
import { LevelType } from '@/types/Level'

export interface Cathlete {
	id: string
	rarity: RarityTypes
	level: LevelType
	energy: EnergyType
	validated: boolean
}

const initCathlete = {
	id: nanoid(),
	rarity: 'common' as const,
	level: 0 as const,
	energy: energy.common,
	validated: false,
}

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
				goodCath.level = <LevelType>parseInt(payload.value)
			}
		},
		validateCathlete: (state, { payload }: PayloadAction<string>) => {
			const goodCath = state.find((cat) => cat.id === payload)

			if (goodCath) {
				goodCath.energy = energy[goodCath.rarity]
				goodCath.validated = true
			}
		},
	},
})

export const { addCathlete, onChangeRarity, onChangeLevel, validateCathlete } = cathleteSlice.actions

export default cathleteSlice.reducer
