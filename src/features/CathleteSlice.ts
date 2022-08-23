import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { RarityTypes } from '@/types/Rarity'
import { energyMap } from '@/types/Energy'
import { LevelType } from '@/types/Level'
import { leagues } from '@/types/League'
import { Cathlete } from '@/types/Cathletes'

const initCathlete = {
	id: nanoid(),
	rarity: 'common' as const,
	level: 0 as const,
	energy: energyMap.get('common')!,
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
				goodCath.energy = energyMap.get(goodCath.rarity)!
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
		fillFromStorage: (state) => {
			const storage = window.localStorage.getItem('wh-cath')

			if (storage) {
				return [...JSON.parse(storage)]
			}
		},

		savingData: (state) => {
			window.localStorage.setItem('wh-cath', JSON.stringify(state))
		},

		resetCathState: () => {
			window.localStorage.setItem('wh-cath', JSON.stringify([initCathlete]))
			return [initCathlete]
		},

		fillFromWallet: (state, { payload }) => {
			return [
				{
					id: nanoid(),
					rarity: payload.rarity,
					level: 6,
					energy: energyMap.get('common')!,
					earnPerDay: 4.04,
					validated: true,
				},
				...initialState,
			]
		},
	},
})

export const {
	addCathlete,
	onChangeRarity,
	onChangeLevel,
	validateCathlete,
	earnCathlete,
	fillFromStorage,
	savingData,
	resetCathState,
	fillFromWallet,
} = cathleteSlice.actions

export default cathleteSlice.reducer
