import { useState } from 'react';
import NumberInput from './NumberInput';
import Selector from './Selector';
import { OLYMPIC_COUNTRIES } from '../ constant/country';

function FilterableMedalTable() {
	const [country, setCountry] = useState('');
	const [gold, setGold] = useState(0);
	const [silver, setSilver] = useState(0);
	const [bronze, setBronze] = useState(0);

	return (
		<div className="border-b-8">
			<h1 className="title">메달 통계</h1>
			<form action="submit">
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
				<button id="btn_create">등록</button>
				<button id="btn_update">수정</button>
			</form>
		</div>
	);
}

export default FilterableMedalTable;
