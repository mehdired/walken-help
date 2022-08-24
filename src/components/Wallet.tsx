import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { useState } from 'react'
import { Metaplex } from '@metaplex-foundation/js'
import { fillFromWallet } from '@features/CathleteSlice'
import { useAppDispatch } from '@/store'
import { RarityTypes } from '@/types/Rarity'

type dataFromWallet = {
	attributes: { value: string }[]
	image: string
}

type ReturnReduceType = { rarity: RarityTypes; image: string; name: string }[]

const connection = new Connection(clusterApiUrl('mainnet-beta'))
const metaplex = Metaplex.make(connection)

export default function Wallet({}) {
	const [walletAddress, setWalletAdress] = useState('')
	const dispatch = useAppDispatch()

	const fetchCath = async () => {
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

			return [...acc, { rarity, image: cath.image, name: cath.attributes[0]?.value }]
		}, [])
	}

	const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setWalletAdress(target.value)
	}

	const handleClickButton = async () => {
		const cathData = await fetchCath()

		dispatch(fillFromWallet(cathData))
	}

	return (
		<div>
			<input type="text" value={walletAddress} onChange={handleChangeInput} placeholder="Wallet Address" />
			<button onClick={handleClickButton}>Validate</button>
		</div>
	)
}
