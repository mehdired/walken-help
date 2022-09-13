import { createStitches } from '@stitches/react'

export const { styled, theme } = createStitches({
	theme: {
		colors: {
			common: '#b2b7be',
			uncommon: '#81c259',
			rare: '#47acf3',
			epic: '#826dd4',
			legendary: '#ffb82f',
			shadow: 'rgb(216 223 229 / 12%)',
			mainBackground: '#f3f8fb',
			border: '#ecf0f4',
			mainText: '#6e7379',
		},
		fonts: {
			main: 'Nunito Sans',
		},
	},
	media: {
		mqTab: '(min-width: 768px)',
		mqDesk: '(min-width: 1024px)',
	},
})
