import { useAppSelector, useAppDispatch } from '@/store'
import { onChangeCheckbox, checkboxCheckedOnLoad } from '@features/SaveDataSlice'
import { useEffect } from 'react'

export default function SaveData() {
	const save = useAppSelector((state) => state.saveData)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(checkboxCheckedOnLoad())
	}, [])

	const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(onChangeCheckbox(event.target.checked))
	}

	return (
		<div>
			<input
				type="checkbox"
				checked={save.saving}
				onChange={(event) => {
					handleChangeCheckbox(event)
				}}
			/>
			<button>Reset</button>
		</div>
	)
}
