import { addCathlete, onChangeRarity, onChangeLevel, validateCathlete } from '@features/CathleteSlice'
import { styled, theme } from '../../stitches.config'

import { useAppDispatch, useAppSelector } from '../store'
import CathleteValidated from './CathleteValidated'
import CathleteForm from './CathleteForm'
import { RarityTypes } from '@/types/Rarity'

const StyledCathlete = styled('div', {
	border: `1px solid ${theme.colors.border}`,
	boxShadow: `0px 4px 12px ${theme.colors.shadow}`,
	borderRadius: '12px',
	backgroundColor: '#fff',
	width: '165px',
	height: '250px',
	padding: '10px',
})

type Props = {}

export default function Cathlete({}: Props) {
	const cathlete = useAppSelector((state) => state.cathlete)
	const dispatch = useAppDispatch()

	const handleChangeRarity = (id: string, value: RarityTypes) => {
		dispatch(onChangeRarity({ id, value }))
	}

	const handleChangeLevel = (id: string, value: string) => {
		dispatch(onChangeLevel({ id, value }))
	}

	const handleValidate = (id: string) => {
		dispatch(validateCathlete(id))
	}

	return (
		<div>
			{cathlete.map(({ id, validated, rarity, level }) => (
				<StyledCathlete key={id}>
					{!validated ? (
						<CathleteForm
							id={id}
							level={level}
							onChangeRarity={handleChangeRarity}
							onChangeLevel={handleChangeLevel}
							onClickValidate={handleValidate}
						/>
					) : (
						<CathleteValidated level={level} rarity={rarity} />
					)}
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
