import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface Coin {
	symbol: string
	price: number
	change: number
	colorChange: 'green' | 'red'
	logo: string
}

const initialState: { loading: boolean; list: Coin[] } = {
	loading: false,
	list: [
		{
			symbol: 'solana',
			price: 0,
			change: 0,
			colorChange: 'green',
			logo: 'solana.svg',
		},
		{ symbol: 'walken', price: 0, change: 0, colorChange: 'green', logo: 'walken.svg' },
	],
}

export const fetchCoin = createAsyncThunk('coin/fetchCoin', async () => {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=solana,walken&vs_currencies=USD&include_24hr_change=true'
	)
	const data: {
		[key: string]: {
			usd: number
			usd_24h_change: number
		}
	} = await response.json()

	return data
})

export const coinSlice = createSlice({
	name: 'coin',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCoin.pending, (state) => {
			state.loading = true
		})

		builder.addCase(fetchCoin.fulfilled, (state, { payload }) => {
			state.loading = false
			state.list[0].price = payload.solana.usd
			state.list[0].change = Number(payload.solana.usd_24h_change.toFixed(2))
			state.list[0].colorChange = state.list[0].change > 0 ? 'green' : 'red'

			state.list[1].price = payload.walken.usd
			state.list[1].change = Number(payload.walken.usd_24h_change.toFixed(2))
			state.list[1].colorChange = state.list[1].change > 0 ? 'green' : 'red'
		})
	},
})

export default coinSlice.reducer
