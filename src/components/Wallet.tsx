import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useEffect, useState } from 'react'

type PhantomEvent = 'disconnect' | 'connect' | 'accountChanged'

type Props = {}

const walletAdress = '6H3uwcQxX8qRSJqp5NYHL9WvziBQKvwXVMRa3nQ83d7n'
const endPoint = 'https://api.mainnet-beta.solana.com'
const connection = new Connection(endPoint)

export default function Wallet({}: Props) {
	useEffect(() => {
		async function fetchBalance() {
			const pubKey = new PublicKey(walletAdress)
			const balance = await connection.getTokenAccountsByOwner(pubKey, {
				programId: TOKEN_PROGRAM_ID,
			})
			console.log(balance)
		}
		fetchBalance()
	}, [])

	return <div>Wallet</div>
}
