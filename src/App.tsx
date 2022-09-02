import { styled } from '../stitches.config'
import { globalCss } from '@stitches/react'
import Cathlete from '@components/Cathlete'
import Earn from '@components/Earn'
import Wallet from '@components/Wallet'
import Header from '@components/Header'
import WayChoice from '@components/WayChoice'
import { useAppSelector } from './store'

const globalStyles = globalCss({
	'@font-face': {
		fontFamily: 'Nunito Sans',
		src: 'url("/fonts/nunito-sans-400.woff2") format("woff2")',
	},
	body: {
		fontFamily: '$main',
		fontWeight: 400,
		color: '$mainText',
	},
})

const StyledApp = styled('div', {
	backgroundColor: '$mainBackground',
	minHeight: '100vh',
	padding: '10px 20px 0',
})

export default function App() {
	globalStyles()
	const { isWallet } = useAppSelector((state) => state.wayChoice)

	return (
		<StyledApp className="App">
			<Header />
			<div style={{ position: 'relative' }}>
				<WayChoice />
				{isWallet && <Wallet />}
				<Earn />
				<Cathlete />
			</div>
		</StyledApp>
	)
}
