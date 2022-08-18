import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { RarityTypes } from '@/types/Rarity'
import { energy } from '@/types/Energy'
import { LevelType } from '@/types/Level'
import { leagues } from '@/types/League'
import { Cathlete } from '@/types/Cathletes'

const initCathlete = {
	id: nanoid(),
	rarity: 'common' as const,
	level: 0 as const,
	energy: energy.common,
	earnPerDay: 0,
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
		earnCathlete: (state, { payload }: PayloadAction<string>) => {
			const goodCath = state.find((cat) => cat.id === payload)

			if (goodCath) {
				const MINUTES_PER_DAY = 1440
				const goodLeague = leagues.find((league) => goodCath.level - 1 <= league.minLevel)
				const wlknEar = (MINUTES_PER_DAY / goodCath.energy.cooldown) * goodLeague?.reward!
				goodCath.earnPerDay = Number(wlknEar.toFixed(2))
			}
		},
	},
})

export const { addCathlete, onChangeRarity, onChangeLevel, validateCathlete, earnCathlete } = cathleteSlice.actions

export default cathleteSlice.reducer
