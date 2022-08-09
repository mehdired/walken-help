import { styled } from '@/../stitches.config'
import { RarityTypes } from '@/types/Rarity'

const StyledCathleteValidated = styled('div', {
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',

	p: {
		color: '$mainText',
	},
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
		backgroundColor: '$common',
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
}

export default function CathleteValidated({ level, rarity }: Props) {
	return (
		<StyledCathleteValidated>
			<p>level {level}</p>
			<div>
				<StyledIcon rarity={rarity}>
					<img src={`/images/${rarity}.svg`} />
				</StyledIcon>
				<p>{rarity.toString()}</p>
			</div>
		</StyledCathleteValidated>
	)
}
