import { useAppDispatch, useAppSelector } from '@/store'
import { onClickChoiceButton } from '@features/WayChoiceSlice'

export default function WayChoice() {
	const dispatch = useAppDispatch()

	return (
		<div>
			<button
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
		</div>
	)
}
