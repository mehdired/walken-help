import { styled } from '@/../stitches.config'
import { RarityTypes } from '@/types/Rarity'

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

type Props = {
	level: number
	rarity: RarityTypes
	earn: number
}

export default function CathleteValidated({ level, rarity, earn }: Props) {
	return (
		<StyledCathleteValidated>
			<StyledEarn>Earn Max : {earn} WLKN</StyledEarn>
			<p style={{ marginBottom: '7px' }}>level {level}</p>
			<div>
				<StyledIcon rarity={rarity}>
					<img src={`/images/${rarity}.svg`} />
				</StyledIcon>
				<StyledRarityText rarity={rarity}>{rarity}</StyledRarityText>
			</div>
		</StyledCathleteValidated>
	)
}
