import { styled } from '../stitches.config'
import Coin from './components/Coin'

const StyledApp = styled('div', {
	backgroundColor: '$mainBackground',
	minHeight: '100vh',
	padding: '10px 20px 0',
})

export default function App() {
	return (
		<StyledApp className="App">
			<div style={{ position: 'relative' }}>
				<Coin />
			</div>
		</StyledApp>
	)
}
