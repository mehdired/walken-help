import { styled } from '@/../stitches.config'
import { useAppDispatch, useAppSelector } from '@/store'
import { onClickChoiceButton } from '@features/WayChoiceSlice'

const StyledWayChoice = styled('div', {
	display: 'flex',
	justifyContent: 'center',
	margin: '10px 0',
})

export default function WayChoice() {
	const dispatch = useAppDispatch()

	return (
		<StyledWayChoice>
			<button
				style={{ marginRight: '8px' }}
				onClick={() => {
					dispatch(onClickChoiceButton(true))
				}}
			>
				I have a wallet
			</button>
			<button
				onClick={() => {
					dispatch(onClickChoiceButton(false))
				}}
			>
				I dont have wallet
			</button>
		</StyledWayChoice>
	)
}
