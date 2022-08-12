export const leagues = [
	{
		name: 'League I',
		minLevel: 0,
		reward: 0.1,
	},
	{
		name: 'League II',
		minLevel: 2,
		reward: 0.19,
	},
	{
		name: 'League III',
		minLevel: 4,
		reward: 0.45,
	},
	{
		name: 'League IV',
		minLevel: 6,
		reward: 1.03,
	},
	{
		name: 'League V',
		minLevel: 8,
		reward: 2.02,
	},
	{
		name: 'League VI',
		minLevel: 10,
		reward: 5.14,
	},
] as const

export type LeagueType = typeof leagues[number]
