import { useEffect, useState } from 'react';
import OLYMPIC_COUNTRIES from '../constant/country';
import Selector from './Selector';
import NumberInput from './NumberInput';
import MedalTable from './MedalTable';
import styles from '../css/FilterableMedalTable.module.css';

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
			const updateRecords = [...prev, newRecord];
			localStorage.setItem('records', JSON.stringify(updateRecords));
			return updateRecords;
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
			const newRecords = { country, gold, silver, bronze };
			const updatedRecords = prev.map((item) => {
				return item.country === country ? newRecords : item;
			});
			localStorage.setItem('records', JSON.stringify(updatedRecords));
			return updatedRecords;
		});

		// 폼초기화
		setCountry('');
		setGold(0);
		setSilver(0);
		setBronze(0);
	}

	function handleIsTotalOnly(e) {
		setIsTotalOnly(e.target.checked);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1 className={styles.title}>메달 통계</h1>
				<form>
					<Selector
						options={OLYMPIC_COUNTRIES}
						value={country}
						onChange={setCountry}
					/>
					<NumberInput
						label="금메달"
						value={gold}
						onChange={setGold}
					/>
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
					<label>
						총메달수로 비교하기
						<input
							type="checkbox"
							value={isTotalOnly}
							onChange={handleIsTotalOnly}
						/>
					</label>
				</form>
				<MedalTable
					records={records}
					onDeleteRecord={setRecords}
					isTotalOnly={isTotalOnly}
				/>
			</div>
		</div>
	);
}

export default FilterableMedalTable;
