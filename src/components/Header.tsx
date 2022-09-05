import { styled } from '@/../stitches.config'
import Coin from '@components/Coin'

const StyledHeader = styled('header', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export default function Header() {
	return (
		<StyledHeader>
			<h1>Walken Help</h1>
			<Coin />
		</StyledHeader>
	)
}
