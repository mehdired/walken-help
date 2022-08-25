import { EnergyType } from './Energy'
import { LevelType } from './Level'
import { RarityTypes } from './Rarity'

export interface Cathlete {
	id: string
	rarity: RarityTypes
	level: LevelType
	energy: EnergyType
	earnPerDay: number
	validated: boolean
	image: string | undefined
	name: string | undefined
}
