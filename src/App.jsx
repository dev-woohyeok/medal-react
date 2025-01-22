import { useState } from 'react';
import { OLYMPIC_COUNTRIES } from './ constant/country';
import Selector from './component/Selector';
import NumberInput from './component/NumberInput';

function App() {
	const [country, setCountry] = useState('');
	const [gold, setGold] = useState(0);
	const [silver, setSilver] = useState(0);
	const [bronze, setBronze] = useState(0);

	console.log(country);
	return (
		<div>
			<h1 className="title">메달 통계</h1>
			<form className="" action="submit">
				<Selector
					options={OLYMPIC_COUNTRIES}
					value={country}
					onChange={setCountry}
				/>
				<NumberInput label="금메달" value={gold} onChange={setGold} />
				<NumberInput
					label="은메달"
					value={silver}
					onChange={setSilver}
				/>
				<NumberInput
					label="동메달"
					value={bronze}
					onChange={setBronze}
				/>
				<button>등록</button>
				<button>수정</button>
			</form>
		</div>
	);
}

export default App;
