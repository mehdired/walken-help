export const RARITIES = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const

export type RarityTypes = typeof RARITIES[number]
