import { useAppSelector } from '@/store'
import { leagues } from '@/types/League'

const MINUTES_PER_DAY = 1440

type Props = {}

export default function Earn({}: Props) {
	const cathletes = useAppSelector((state) => state.cathlete)

	const wlknEarnPerDay = cathletes.reduce((acc, cathlete) => {
		if (!cathlete.validated) return acc

		const goodLeague = leagues.find((league) => cathlete.level - 1 <= league.minLevel)
		const wlknEar = (MINUTES_PER_DAY / cathlete.energy.cooldown) * goodLeague?.reward!
		return acc + Number(wlknEar.toFixed(2))
	}, 0)

	return <div>Maximum WLKN per day : {wlknEarnPerDay}</div>
}
