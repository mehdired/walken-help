import { RarityTypes } from './Rarity'

export type EnergyType = { value: number; cooldown: number }

export const energyMap = new Map<RarityTypes, EnergyType>([
	[
		'common',
		{
			value: 3,
			cooldown: 120,
		},
	],
	[
		'uncommon',
		{
			value: 4,
			cooldown: 105,
		},
	],
	[
		'rare',
		{
			value: 6,
			cooldown: 90,
		},
	],
	[
		'epic',
		{
			value: 8,
			cooldown: 75,
		},
	],
	[
		'legendary',
		{
			value: 12,
			cooldown: 60,
		},
	],
])
