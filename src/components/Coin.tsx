import { useEffect } from 'react'
import { fetchCoin } from '../features/CoinSlice'
import { useAppDispatch, useAppSelector } from '../store'

type Props = {}

export default function Coin({}: Props) {
	const coin = useAppSelector((state) => state.coin)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchCoin())
	}, [dispatch])

	return (
		<div>
			{!coin.loading && (
				<div>
					{coin.list.map((element) => (
						<div key={element.symbol}>
							{element.symbol} {element.price}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
