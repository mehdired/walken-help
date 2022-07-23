import { styled } from '@stitches/react'
import { useEffect } from 'react'
import { fetchCoin } from '../features/CoinSlice'
import { useAppDispatch, useAppSelector } from '../store'

const StyledCoinList = styled('ul', {
	backgroundColor: '#fff',
	borderRadius: '10px',
	boxShadow: '1px -1px 9px #000',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '10px 0',
	listStyle: 'none',
	width: '140px',
	position: 'absolute',
	right: '0',
})

export default function Coin() {
	const coin = useAppSelector((state) => state.coin)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchCoin())
	}, [dispatch])

	return (
		<StyledCoinList>
			{!coin.loading && (
				<>
					{coin.list.map((element) => (
						<li key={element.symbol}>
							{element.symbol} {element.price}
						</li>
					))}
				</>
			)}
		</StyledCoinList>
	)
}
