import { useAppSelector, useAppDispatch } from '@/store'
import { onChangeCheckbox } from '@features/SaveDataSlice'

export default function SaveData() {
	const save = useAppSelector((state) => state.saveData)
	const dispatch = useAppDispatch()

	const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.checked)
		dispatch(onChangeCheckbox(event.target.checked))
	}

	return (
		<input
			type="checkbox"
			checked={save.saving}
			onChange={(event) => {
				handleChangeCheckbox(event)
			}}
		/>
	)
}
