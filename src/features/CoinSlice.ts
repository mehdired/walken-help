import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface Coin {
	symbol: string
	price: number
}

const initialState = {
	loading: false,
	list: [
		{
			symbol: 'solana',
			price: 0,
			logo: 'solana.svg',
		},
		{ symbol: 'walken', price: 0, logo: 'walken.svg' },
	],
}

export const fetchCoin = createAsyncThunk('coin/fetchCoin', async () => {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=solana,walken&vs_currencies=USD&include_24hr_change=true'
	)
	const data: {
		[key: string]: {
			usd: number
		}
	} = await response.json()

	return data
})

export const coinSlice = createSlice({
	name: 'coin',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCoin.pending, (state, { payload }) => {
			state.loading = true
		})

		builder.addCase(fetchCoin.fulfilled, (state, { payload }) => {
			state.loading = false
			state.list[0].price = payload.solana.usd
			state.list[1].price = payload.walken.usd
		})
	},
})

export default coinSlice.reducer
