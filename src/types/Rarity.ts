export enum RarityEnum {
	COMMON = 'common',
	UNCOMMON = 'uncommon',
	RARE = 'rare',
	EPIC = 'epic',
	LEGENDARY = 'legendary',
}

export type RarityTypes =
	| RarityEnum.COMMON
	| RarityEnum.UNCOMMON
	| RarityEnum.RARE
	| RarityEnum.EPIC
	| RarityEnum.LEGENDARY
