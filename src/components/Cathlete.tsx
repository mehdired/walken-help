import { addCathlete } from '@features/CathleteSlice'
import { styled, theme } from '../../stitches.config'

import { useAppDispatch, useAppSelector } from '../store'

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

	return (
		<div>
			{cathlete.map((element, index) => (
				<StyledCathlete key={index}>
					<input type="text" placeholder="level" />
					<input type="text" placeholder="rarity" />
				</StyledCathlete>
			))}
			<button
				onClick={() => {
					dispatch(addCathlete())
				}}
			>
				add
			</button>
		</div>
	)
}

/**

 */
