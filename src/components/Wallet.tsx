import { useState } from 'react'
import { fetchCathFromWallet } from '@features/CathleteSlice'
import { useAppDispatch } from '@/store'

export default function Wallet({}) {
	const [walletAddress, setWalletAdress] = useState('')
	const dispatch = useAppDispatch()

	const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setWalletAdress(target.value)
	}

	const handleClickButton = () => {
		dispatch(fetchCathFromWallet(walletAddress))
	}

	return (
		<div>
			<input type="text" value={walletAddress} onChange={handleChangeInput} placeholder="Wallet Address" />
			<button onClick={handleClickButton}>Validate</button>
		</div>
	)
}
