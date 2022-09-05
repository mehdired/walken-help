import { createSlice, createAsyncThunk, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { Metaplex } from '@metaplex-foundation/js'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { RarityTypes } from '@/types/Rarity'
import { energyMap } from '@/types/Energy'
import { LevelType } from '@/types/Level'
import { leagues } from '@/types/League'
import { Cathlete } from '@/types/Cathletes'

const connection = new Connection(clusterApiUrl('mainnet-beta'))
const metaplex = Metaplex.make(connection)

type dataFromWallet = {
	attributes: { value: string }[]
	image: string
}

type ReturnReduceType = { rarity: RarityTypes; image: string; name: string }[]

export const fetchCathFromWallet = createAsyncThunk(
	'cathlete/fetchCathFromWallet',
	async (walletAddress: string) => {
		const nft = await metaplex
			.nfts()
			.findAllByOwner({ owner: new PublicKey(walletAddress) })
			.run()
		const cathleteMetadata = nft.filter((e) => e.symbol === 'WLKNC')

		const resquests = cathleteMetadata.map(async (cath) => {
			const res = await fetch(cath.uri)
			return res.json()
		})
		const cathFromWallet = await Promise.all<dataFromWallet>(resquests)

		return cathFromWallet.reduce<ReturnReduceType>((acc, cath) => {
			const rarity = cath.attributes[1]?.value.toLowerCase() as RarityTypes

			return [
				...acc,
				{ rarity, image: cath.image, name: cath.attributes[0]?.value },
			]
		}, [])
	}
)

const initCathlete = {
	id: nanoid(),
	rarity: 'common' as const,
	level: 0 as const,
	energy: energyMap.get('common')!,
	earnPerDay: 0,
	validated: false,
	image: undefined,
	name: undefined,
}

const initialState: { isLoading: boolean; list: Cathlete[] } = {
	isLoading: false,
	list: [],
}

export const cathleteSlice = createSlice({
	name: 'cathlete',
	initialState,
	reducers: {
		addCathlete: (state) => {
			return {
				isLoading: false,
				list: [...state.list, { ...initCathlete, id: nanoid() }],
			}
		},
		onChangeRarity: (
			state,
			{ payload }: PayloadAction<{ id: string; value: RarityTypes }>
		) => {
			const goodCath = state.list.find((cat) => cat.id === payload.id)

			if (goodCath) {
				goodCath.rarity = payload.value
			}
		},
		onChangeLevel: (
			state,
			{ payload }: PayloadAction<{ id: string; value: string }>
		) => {
			const goodCath = state.list.find((cat) => cat.id === payload.id)

			if (goodCath) {
				goodCath.level = <LevelType>parseInt(payload.value)
			}
		},
		validateCathlete: (state, { payload }: PayloadAction<string>) => {
			const goodCath = state.list.find((cat) => cat.id === payload)

			if (goodCath) {
				goodCath.energy = energyMap.get(goodCath.rarity)!
				goodCath.validated = true
			}
		},
		earnCathlete: (state, { payload }: PayloadAction<string>) => {
			const goodCath = state.list.find((cat) => cat.id === payload)

			if (goodCath) {
				const MINUTES_PER_DAY = 1440
				const goodLeague = leagues.find(
					(league) => goodCath.level - 1 <= league.minLevel
				)
				const wlknEar =
					(MINUTES_PER_DAY / goodCath.energy.cooldown) * goodLeague?.reward!
				goodCath.earnPerDay = Number(wlknEar.toFixed(2))
			}
		},
		fillFromStorage: () => {
			const storage = window.localStorage.getItem('wh-cath')

			if (storage) {
				return { isLoading: false, list: [...JSON.parse(storage)] }
			}
		},

		savingData: (state) => {
			window.localStorage.setItem('wh-cath', JSON.stringify(state.list))
		},

		resetCathState: () => {
			window.localStorage.setItem('wh-cath', JSON.stringify([initCathlete]))
			return { isLoading: false, list: [initCathlete] }
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCathFromWallet.pending, (state) => {
			state.isLoading = true
		}),
			builder.addCase(fetchCathFromWallet.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.list = payload.reduce<Cathlete[]>((acc, cath) => {
					return [
						...acc,
						{
							id: nanoid(),
							rarity: cath.rarity,
							level: 6,
							energy: energyMap.get(cath.rarity)!,
							earnPerDay: 4.04,
							validated: true,
							image: cath.image,
							name: cath.name,
						},
					]
				}, [])
			})
	},
})

export const {
	addCathlete,
	onChangeRarity,
	onChangeLevel,
	validateCathlete,
	earnCathlete,
	fillFromStorage,
	savingData,
	resetCathState,
} = cathleteSlice.actions

export default cathleteSlice.reducer
