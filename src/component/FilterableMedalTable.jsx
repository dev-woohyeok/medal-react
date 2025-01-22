import { useEffect, useState } from 'react';
import OLYMPIC_COUNTRIES from '../ constant/country';
import Selector from './Selector';
import NumberInput from './NumberInput';
import MedalTable from './MedalTable';

function FilterableMedalTable() {
	const [country, setCountry] = useState('');
	const [gold, setGold] = useState(0);
	const [silver, setSilver] = useState(0);
	const [bronze, setBronze] = useState(0);
	const [records, setRecords] = useState([]);
	const [isTotalOnly, setIsTotalOnly] = useState(false);

	useEffect(() => {
		setRecords(JSON.parse(localStorage.getItem('records')) || []);
	}, []);

	function handleCreate(e) {
		e.preventDefault();
		if (!country) {
			alert('국가를 선택해주세요.');
			return;
		}
		// 중복 방지 알림
		if (records.some((item) => item.country === country)) {
			alert('이미 등록된 국가입니다.');
			return;
		}

		// 로컬스토리지에 등록하기
		const newRecord = { country, gold, silver, bronze };
		setRecords((prev) => {
			const updatedData = [...prev, newRecord];
			localStorage.setItem('records', JSON.stringify(updatedData));
			return updatedData;
		});

		// 폼초기화
		setCountry('');
		setGold(0);
		setSilver(0);
		setBronze(0);
	}

	function handleUpdate(e) {
		e.preventDefault();
		if (!country) {
			alert('국가를 선택해주세요.');
			return;
		}
		// 국가 존재 여부 확인
		if (!records.some((item) => item.country === country)) {
			alert('해당 국가는 등록되지 않은 국가입니다.');
			return;
		}

		// 로컬스토리지에 수정하기
		setRecords((prev) => {
			prev.filter((record) => {
				return record.country === country
					? { country, gold, silver, bronze }
					: record;
			});
		});
	}

	function handleIsTotalOnly(e) {
		setIsTotalOnly(e.target.checked);
	}

	return (
		<div>
			<h1>메달 통계</h1>
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
				<button onClick={handleCreate}>등록</button>
				<button onClick={handleUpdate}>수정</button>
				<input
					type="checkbox"
					value={isTotalOnly}
					onChange={handleIsTotalOnly}
				/>
			</form>
			<MedalTable
				records={records}
				onDeleteRecord={setRecords}
				isTotalOnly={isTotalOnly}
			/>
		</div>
	);
}

export default FilterableMedalTable;
