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
import Loader from './Loader'
import { RARITIES, RarityTypes } from '@/types/Rarity'

const StyledSelect = styled('select', {
	textTransform: 'capitalize',
})

type PropsCathleteForm = {
	id: string
	level: number
	onChangeRarity: (id: string, value: RarityTypes) => void
	onChangeLevel: (id: string, value: string) => void
	onClickValidate: (id: string) => void
}

const CathleteForm = ({
	id,
	level,
	onChangeRarity,
	onChangeLevel,
	onClickValidate,
}: PropsCathleteForm) => {
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
			<StyledSelect
				onChange={({ currentTarget }) => {
					onChangeRarity(id, currentTarget.value as RarityTypes)
				}}
			>
				{RARITIES.map((rarity) => (
					<option value={rarity} key={rarity}>
						{rarity}
					</option>
				))}
			</StyledSelect>
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

const StyledCathleteValidated = styled('div', {
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	position: 'relative',
})

const StyledRarityText = styled('p', {
	textTransform: 'capitalize',

	variants: {
		rarity: {
			common: {
				color: '$common',
			},
			uncommon: {
				color: '$uncommon',
			},
			rare: {
				color: '$rare',
			},
			epic: {
				color: '$epic',
			},
			legendary: {
				color: '$legendary',
			},
		},
	},
})

const StyledEarn = styled('p', {
	position: 'absolute',
	right: 0,
	top: 0,
	fontSize: 11,
})

const StyledIcon = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '50%',
	width: 28,
	height: 28,
	margin: '0 auto',
	position: 'relative',
	overflow: 'hidden',

	'&::before': {
		content: '',
		display: 'block',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		opacity: '0.1',
	},

	variants: {
		rarity: {
			common: {
				'&::before': {
					backgroundColor: '$common',
				},
			},
			uncommon: {
				'&::before': {
					backgroundColor: '$uncommon',
				},
			},
			rare: {
				'&::before': {
					backgroundColor: '$rare',
				},
			},
			epic: {
				'&::before': {
					backgroundColor: '$epic',
				},
			},
			legendary: {
				'&::before': {
					backgroundColor: '$legendary',
				},
			},
		},
	},

	img: {
		width: '9px',
	},
})

const StyledImage = styled('img', {
	width: '100%',
})

type PropsCathleteValidated = {
	level: number
	rarity: RarityTypes
	earn: number
	image: string | undefined
	name: string | undefined
}

const CathleteValidated = ({
	level,
	rarity,
	earn,
	image,
	name,
}: PropsCathleteValidated) => {
	return (
		<StyledCathleteValidated>
			<StyledEarn>Earn Max : {earn} WLKN</StyledEarn>
			<p style={{ marginBottom: '7px' }}>level {level}</p>
			{image && <StyledImage src={image} />}
			{name && <p>{name}</p>}
			<div>
				<StyledIcon rarity={rarity}>
					<img src={`/images/${rarity}.svg`} />
				</StyledIcon>
				<StyledRarityText rarity={rarity}>{rarity}</StyledRarityText>
			</div>
		</StyledCathleteValidated>
	)
}

const StyledCathlete = styled('div', {
	border: `1px solid ${theme.colors.border}`,
	boxShadow: `0px 4px 12px ${theme.colors.shadow}`,
	borderRadius: '12px',
	backgroundColor: '#fff',
	padding: '10px',
})

const StyledCathContainer = styled('div', {
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridAutoRows: '360px',
	gap: '10px',

	'@mqTab': {
		gridTemplateColumns: 'repeat(3, 235px)',
		justifyContent: 'center',
	},

	'@mqDesk': {
		gridTemplateColumns: 'repeat(4, 1fr)',
	},
})

export default function Cathlete() {
	const { isLoading, list: cathlete } = useAppSelector((state) => state.cathlete)
	//const saveData = useAppSelector((state) => state.saveData)
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

		/* if (saveData) {
			dispatch(savingData())
		} */
	}

	const handleReset = () => {
		dispatch(resetCathState())
	}

	if (isLoading) return <Loader />

	return (
		<div>
			{/* <button onClick={handleReset}>Reset cathletes</button> */}
			<StyledCathContainer>
				{cathlete.map(
					({ id, validated, rarity, level, earnPerDay, image, name }) => (
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
					)
				)}
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
