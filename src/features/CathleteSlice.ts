import { createSlice } from '@reduxjs/toolkit'
import { RarityTypes, RarityEnum } from '@/types/Rarity'

export interface Cathlete {
	id: number
	rarity: RarityTypes
	level: number
}

const initCathlete = { id: 0, rarity: RarityEnum.COMMON, level: 0 }

const initialState: Cathlete[] = [initCathlete]

export const cathleteSlice = createSlice({
	name: 'cathlete',
	initialState,
	reducers: {
		addCathlete: (state) => {
			return [...state, initCathlete]
		},
	},
})

export const { addCathlete } = cathleteSlice.actions

export default cathleteSlice.reducer
