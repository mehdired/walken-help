import { addCathlete, onChangeInput } from '@features/CathleteSlice'
import { styled, theme } from '../../stitches.config'

import { useAppDispatch, useAppSelector } from '../store'
import { RarityEnum } from '@/types/Rarity'

const StyledCathlete = styled('div', {
	border: `1px solid ${theme.colors.border}`,
	boxShadow: `0px 4px 12px ${theme.colors.shadow}`,
	borderRadius: '12px',
	backgroundColor: '#fff',
	width: '165px',
	height: '250px',
})

type Props = {}

export default function Cathlete({}: Props) {
	const cathlete = useAppSelector((state) => state.cathlete)
	const dispatch = useAppDispatch()

	const handleChangeInput = (id: string, value: string, inputType: 'level' | 'rarity') => {
		dispatch(onChangeInput({ id, value, inputType }))
	}

	return (
		<div>
			{cathlete.map(({ id }) => (
				<StyledCathlete key={id}>
					<input
						type="number"
						placeholder="level"
						onChange={({ target }) => {
							handleChangeInput(id, target.value, 'level')
						}}
					/>
					<select
						onChange={({ target }) => {
							handleChangeInput(id, target.value, 'rarity')
						}}
					>
						{(Object.keys(RarityEnum) as (keyof typeof RarityEnum)[]).map((rarityKey) => (
							<option value={RarityEnum[rarityKey]} key={RarityEnum[rarityKey]}>
								{RarityEnum[rarityKey]}
							</option>
						))}
					</select>
					<button>validate</button>
				</StyledCathlete>
			))}
			<StyledCathlete>
				<button
					onClick={() => {
						dispatch(addCathlete())
					}}
				>
					add
				</button>
			</StyledCathlete>
		</div>
	)
}

/**

 */
