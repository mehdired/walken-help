import { styled } from '../stitches.config'
import { globalCss } from '@stitches/react'
import Cathlete from '@components/Cathlete'
import Coin from '@components/Coin'
import Earn from '@components/Earn'
import SaveData from '@components/SaveData'
import Wallet from '@components/Wallet'

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

	return (
		<StyledApp className="App">
			<Coin />
			<div style={{ position: 'relative' }}>
				<Wallet />
				<SaveData />
				<Earn />
				<Cathlete />
			</div>
		</StyledApp>
	)
}
