import { styled, theme } from '../../stitches.config'
import { useEffect } from 'react'
import { fetchCoin } from '@features/CoinSlice'
import { useAppDispatch, useAppSelector } from '../store'

const StyledCoinList = styled('ul', {
	backgroundColor: '#fff',
	borderRadius: '12px',
	boxShadow: `0px 4px 12px ${theme.colors.shadow}`,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '18px 10px',
	listStyle: 'none',
	maxWidth: '180px',
	border: `1px solid ${theme.colors.border}`,
})

const StyledCoinListItem = styled('li', {
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',

	'&:last-child': {
		marginLeft: '15px',
	},
})

const StyledLogo = styled('img', {
	width: '20px',
	height: '20px',
	marginRight: '5px',
})

const StyledPrice = styled('span', {
	fontSize: '12px',
})

const StyledChange = styled('p', {
	fontSize: '11px',

	variants: {
		color: {
			red: {
				color: '#e15241',
			},
			green: {
				color: '#8dc647',
			},
		},
	},
})

export default function Coin() {
	const coin = useAppSelector((state) => state.coin)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchCoin())
	}, [dispatch])

	if (coin.loading) return null

	return (
		<StyledCoinList>
			{coin.list.map((element) => (
				<StyledCoinListItem key={element.symbol}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '5px',
						}}
					>
						<StyledLogo src={`/images/${element.symbol}.svg`} />
						<StyledPrice>${element.price}</StyledPrice>
					</div>
					<StyledChange color={element.colorChange}>
						{element.change}%
					</StyledChange>
				</StyledCoinListItem>
			))}
		</StyledCoinList>
	)
}
