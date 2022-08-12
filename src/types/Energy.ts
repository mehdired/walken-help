export const energy = {
	common: {
		value: 3,
		cooldown: 120,
	},
	uncommon: {
		value: 4,
		cooldown: 105,
	},
	rare: {
		value: 6,
		cooldown: 90,
	},
	epic: {
		value: 8,
		cooldown: 75,
	},
	legendary: {
		value: 12,
		cooldown: 60,
	},
} as const

type energyKey = keyof typeof energy

export type EnergyType = typeof energy[energyKey]
