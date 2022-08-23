import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { useState } from 'react'
import { Metaplex } from '@metaplex-foundation/js'

const connection = new Connection(clusterApiUrl('mainnet-beta'))

export default function Wallet({}) {
	const [walletAddress, setWalletAdress] = useState('')

	const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setWalletAdress(target.value)
	}

	const handleClickButton = async () => {
		const metaplex = new Metaplex(connection)
		const nft = await metaplex
			.nfts()
			.findAllByOwner({ owner: new PublicKey(walletAddress) })
			.run()
		const cath = nft.filter((e) => e.symbol === 'WLKNC')
		const test = await (await fetch(cath[0].uri)).json()
		console.log(test)
	}

	return (
		<div>
			<input type="text" value={walletAddress} onChange={handleChangeInput} />
			<button onClick={handleClickButton}>Validate</button>
		</div>
	)
}
