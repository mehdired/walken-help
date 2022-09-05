import { useState } from 'react'
import { fetchCathFromWallet } from '@features/CathleteSlice'
import { useAppDispatch, useAppSelector } from '@/store'
import { onChangeWallet, onSubmitWallet } from '@features/WalletSlice'
import { styled } from '@/../stitches.config'

const StyledWallet = styled('div', {
	textAlign: 'center',
	marginBottom: '20px',
})

export default function Wallet({}) {
	const { address } = useAppSelector((state) => state.wallet)
	const dispatch = useAppDispatch()

	const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(onChangeWallet(target.value))
	}

	const handleClickButton = () => {
		dispatch(fetchCathFromWallet(address))
		dispatch(onSubmitWallet())
	}

	return (
		<StyledWallet>
			<input
				type="text"
				value={address}
				onChange={handleChangeInput}
				placeholder="Wallet Address"
			/>
			<button onClick={handleClickButton}>Validate</button>
		</StyledWallet>
	)
}
