import { useAppSelector } from '@/store'

type Props = {}

export default function Earn({}: Props) {
	const cathletes = useAppSelector((state) => state.cathlete)

	const wlknEarnPerDay = cathletes.reduce((acc, cathlete) => {
		if (!cathlete.validated) return acc
		console.log('haha')
		return acc + cathlete.earnPerDay
	}, 0)

	return <div>Maximum WLKN per day : {wlknEarnPerDay}</div>
}
