export enum RarityEnum {
	COMMON = 'Common',
	UNCOMMON = 'Uncommon',
	RARE = 'Rare',
	EPIC = 'Epic',
	LEGENDARY = 'Legendary',
}

type ValueOf<T> = T[keyof T]

export type RarityTypes = ValueOf<RarityEnum>
