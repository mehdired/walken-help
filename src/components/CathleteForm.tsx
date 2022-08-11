import { RARITIES, RarityTypes } from '@/types/Rarity'

type Props = {
	id: string
	level: number
	onChangeRarity: (id: string, value: RarityTypes) => void
	onChangeLevel: (id: string, value: string) => void
	onClickValidate: (id: string) => void
}

export default function CathleteForm({ id, level, onChangeRarity, onChangeLevel, onClickValidate }: Props) {
	return (
		<div className="catFrom">
			<input
				type="range"
				value={level}
				min="0"
				max="10"
				onChange={({ target }) => {
					onChangeLevel(id, target.value)
				}}
			/>
			<span>{level}</span>
			<select
				onChange={({ currentTarget }) => {
					onChangeRarity(id, currentTarget.value as RarityTypes)
				}}
			>
				{RARITIES.map((rarity) => (
					<option value={rarity} key={rarity}>
						{rarity}
					</option>
				))}
			</select>
			<button
				onClick={() => {
					onClickValidate(id)
				}}
			>
				validate
			</button>
		</div>
	)
}
