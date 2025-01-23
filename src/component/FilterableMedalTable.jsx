import { useEffect, useState } from 'react';
import OLYMPIC_COUNTRIES from '../constant/country';
import Selector from './Selector';
import Input from './Input';
import MedalTable from './MedalTable';
import styles from '../styles/FilterableMedalTable.module.css';
import Button from './Button';

function FilterableMedalTable() {
	const [state, setState] = useState({
		country: '',
		gold: 0,
		silver: 0,
		bronze: 0,
		records: [],
		isTotalOnly: false,
	});

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			records: JSON.parse(localStorage.getItem('records')) || [],
		}));
	}, []);

	function handleCreate(e) {
		e.preventDefault();
		if (!state.country) {
			alert('국가를 선택해주세요.');
			return;
		}

		// 중복 방지 알림
		if (state.records.some((item) => item.country === state.country)) {
			alert('이미 등록된 국가입니다.');
			return;
		}

		// 로컬스토리지에 등록하기
		const newRecord = {
			country: state.country,
			gold: state.gold,
			silver: state.silver,
			bronze: state.bronze,
		};

		setState((prevState) => {
			const updatedRecords = [...prevState.records, newRecord];
			localStorage.setItem('records', JSON.stringify(updatedRecords));
			return {
				...prevState,
				records: updatedRecords,
				country: '',
				gold: 0,
				silver: 0,
				bronze: 0,
			};
		});
	}

	function handleUpdate(e) {
		e.preventDefault();
		if (!state.country) {
			alert('국가를 선택해주세요.');
			return;
		}
		// 국가 존재 여부 확인
		if (!state.records.some((item) => item.country === state.country)) {
			alert('해당 국가는 등록되지 않은 국가입니다.');
			return;
		}

		// 로컬스토리지에 수정하기
		setState((prevState) => {
			const newRecord = {
				country: state.country,
				gold: state.gold,
				silver: state.silver,
				bronze: state.bronze,
			};
			const updatedRecords = prevState.records.map((item) =>
				item.country === state.country ? newRecord : item,
			);
			localStorage.setItem('records', JSON.stringify(updatedRecords));
			return {
				...prevState,
				records: updatedRecords,
				country: '',
				gold: 0,
				silver: 0,
				bronze: 0,
			};
		});
	}

	function handleIsTotalOnly(e) {
		setState((prevState) => ({
			...prevState,
			isTotalOnly: e.target.checked,
		}));
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1 className={styles.title}>메달 통계</h1>
				<form className={styles.form}>
					<Selector
						label="국가"
						options={OLYMPIC_COUNTRIES}
						value={state.country}
						onChange={(value) =>
							setState((prev) => ({ ...prev, country: value }))
						}
					/>
					<Input
						label="금메달"
						value={state.gold}
						onChange={(value) =>
							setState((prev) => ({ ...prev, gold: value }))
						}
						type="number"
					/>
					<Input
						label="은메달"
						value={state.silver}
						onChange={(value) =>
							setState((prev) => ({ ...prev, silver: value }))
						}
						type="number"
					/>
					<Input
						label="동메달"
						value={state.bronze}
						onChange={(value) =>
							setState((prev) => ({ ...prev, bronze: value }))
						}
						type="number"
					/>
					<Button label="등록" type="create" onClick={handleCreate} />
					<Button label="수정" type="update" onClick={handleUpdate} />
					<label>
						총점 비교
						<input
							type="checkbox"
							checked={state.isTotalOnly}
							onChange={handleIsTotalOnly}
						/>
					</label>
				</form>
				<MedalTable
					records={state.records}
					onDeleteRecord={() => setState}
					isTotalOnly={state.isTotalOnly}
				/>
			</div>
		</div>
	);
}

export default FilterableMedalTable;
