import { useState } from 'react'
import Coin from './components/Coin'

export default function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<Coin />
		</div>
	)
}
