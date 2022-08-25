import { styled } from '@/../stitches.config'
import { keyframes } from '@stitches/react'

const spinner = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' },
})

const StyledLoader = styled('div', {
	width: '50px',
	height: '50px',
	border: '6px solid #f3f3f3',
	borderTop: '6px solid #383636',
	borderRadius: '50%',
	animation: `${spinner} 1.5s infinite`,
	zIndex: '9',
})

const StyledFullscreen = styled('div', {
	position: 'fixed',
	top: 0,
	left: 0,
	height: '100%',
	width: '100%',
	backgroundColor: 'rgb(0 0 0 / 0.5)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
})

type Props = {
	fullscreen?: boolean
}

export default function Loader({ fullscreen = false }: Props) {
	if (fullscreen) {
		return (
			<StyledFullscreen>
				<StyledLoader />
			</StyledFullscreen>
		)
	}

	return <StyledLoader />
}
