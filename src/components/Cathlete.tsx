import { useEffect } from 'react'
import {
	addCathlete,
	onChangeRarity,
	onChangeLevel,
	validateCathlete,
	earnCathlete,
	fillFromStorage,
	savingData,
	resetCathState,
} from '@features/CathleteSlice'
import { styled, theme } from '../../stitches.config'

import { useAppDispatch, useAppSelector } from '../store'
import CathleteValidated from './CathleteValidated'
import CathleteForm from './CathleteForm'
import Loader from './Loader'
import { RarityTypes } from '@/types/Rarity'

const StyledCathlete = styled('div', {
	border: `1px solid ${theme.colors.border}`,
	boxShadow: `0px 4px 12px ${theme.colors.shadow}`,
	borderRadius: '12px',
	backgroundColor: '#fff',
	padding: '10px',
})

const StyledCathContainer = styled('div', {
	display: 'grid',
	gridTemplateColumns: 'repeat(4, 190px)',
	gridAutoRows: '290px',
	gap: '10px',
})

type Props = {}

export default function Cathlete({}: Props) {
	const { isLoading, list: cathlete } = useAppSelector((state) => state.cathlete)
	const saveData = useAppSelector((state) => state.saveData)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fillFromStorage())
	}, [])

	const handleChangeRarity = (id: string, value: RarityTypes) => {
		dispatch(onChangeRarity({ id, value }))
	}

	const handleChangeLevel = (id: string, value: string) => {
		dispatch(onChangeLevel({ id, value }))
	}

	const handleValidateCath = (id: string) => {
		dispatch(validateCathlete(id))
		dispatch(earnCathlete(id))

		if (saveData) {
			dispatch(savingData())
		}
	}

	const handleReset = () => {
		dispatch(resetCathState())
	}

	if (isLoading) return <Loader fullscreen={true} />

	return (
		<div>
			<button onClick={handleReset}>Reset cathletes</button>
			<StyledCathContainer>
				{cathlete.map(({ id, validated, rarity, level, earnPerDay, image, name }) => (
					<StyledCathlete key={id}>
						{!validated ? (
							<CathleteForm
								id={id}
								level={level}
								onChangeRarity={handleChangeRarity}
								onChangeLevel={handleChangeLevel}
								onClickValidate={handleValidateCath}
							/>
						) : (
							<CathleteValidated
								name={name ?? undefined}
								image={image ?? undefined}
								level={level}
								rarity={rarity}
								earn={earnPerDay}
							/>
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
			</StyledCathContainer>
		</div>
	)
}

/**

 */
