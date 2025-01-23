import { TYPE_LOCALSTORAGE, TYPE_STATEFORM } from '../constant/type';

import styles from '../styles/MedalForm.module.css';
import Selector from './Selector';
import Input from './Input';
import Button from './Button';
import { OLYMPIC_COUNTRIES_LIST } from '../constant/constant';

function MedalForm({ stateForm, setStateForm, stateRecords, setStateRecords }) {
	function handleCreate(e) {
		e.preventDefault();
		if (!stateForm[TYPE_STATEFORM.COUNTRY]) {
			alert('국가를 선택해주세요.');
			return;
		}

		// 중복 방지 알림
		if (
			stateRecords.some(
				(item) => item.country === stateForm[TYPE_STATEFORM.COUNTRY],
			)
		) {
			alert('이미 등록된 국가입니다.');
			return;
		}

		setStateRecords((prevState) => {
			const newRecord = {
				country: stateForm[TYPE_STATEFORM.COUNTRY],
				gold: stateForm[TYPE_STATEFORM.GOLD],
				silver: stateForm[TYPE_STATEFORM.SILVER],
				bronze: stateForm[TYPE_STATEFORM.BRONZE],
			};
			const updatedRecords = [...prevState, newRecord];
			localStorage.setItem('records', JSON.stringify(updatedRecords));
			return updatedRecords;
		});
		setStateForm({
			...stateForm,
			gold: 0,
			silver: 0,
			bronze: 0,
			country: '',
		});
	}

	function handleUpdate(e) {
		e.preventDefault();
		if (!stateForm[TYPE_STATEFORM.COUNTRY]) {
			alert('국가를 선택해주세요.');
			return;
		}
		// 국가 존재 여부 확인
		if (
			!stateRecords.some(
				(item) => item.country === stateForm[TYPE_STATEFORM.COUNTRY],
			)
		) {
			alert('해당 국가는 등록되지 않은 국가입니다.');
			return;
		}

		// 수정해야하는 국가 메달 업데이트 하기
		setStateRecords((prevState) => {
			const newRecord = {
				country: stateForm[TYPE_STATEFORM.COUNTRY],
				gold: stateForm[TYPE_STATEFORM.GOLD],
				silver: stateForm[TYPE_STATEFORM.SILVER],
				bronze: stateForm[TYPE_STATEFORM.BRONZE],
			};
			const updatedRecords = prevState.map((item) =>
				item.country === stateForm[TYPE_STATEFORM.COUNTRY]
					? newRecord
					: item,
			);
			localStorage.setItem(
				TYPE_LOCALSTORAGE.MEDALS_RECORD_LIST,
				JSON.stringify(updatedRecords),
			);
			return updatedRecords;
		});
		setStateForm({
			...stateForm,
			gold: 0,
			silver: 0,
			bronze: 0,
			country: '',
		});
	}

	function handleOnChange(e, medalType) {
		const value = parseInt(e.target.value) || '';
		setStateForm((prev) => ({
			...prev,
			[medalType]: value,
		}));
	}

	function handleIsTotalOnly(e) {
		setStateForm((prev) => ({
			...prev,
			isTotalOnly: e.target.checked,
		}));
	}

	return (
		<form className={styles.form}>
			<Selector
				label="국가"
				options={OLYMPIC_COUNTRIES_LIST}
				value={stateForm[TYPE_STATEFORM.COUNTRY]}
				onChange={(e) => {
					setStateForm((prev) => ({
						...prev,
						country: e.target.value,
					}));
				}}
			/>
			<Input
				label="금메달"
				value={stateForm[TYPE_STATEFORM.GOLD]}
				onChange={(e) => handleOnChange(e, TYPE_STATEFORM.GOLD)}
				onFocus={(e) => e.target.select()}
				type="number"
				min={0}
			/>
			<Input
				label="은메달"
				value={stateForm[TYPE_STATEFORM.SILVER]}
				onChange={(e) => handleOnChange(e, TYPE_STATEFORM.SILVER)}
				onFocus={(e) => e.target.select()}
				type="number"
				min={0}
			/>
			<Input
				label="동메달"
				value={stateForm[TYPE_STATEFORM.BRONZE]}
				onChange={(e) => handleOnChange(e, TYPE_STATEFORM.BRONZE)}
				onFocus={(e) => e.target.select()}
				type="number"
				min={0}
			/>
			<Button onClick={handleCreate} color="blue">
				등록
			</Button>
			<Button onClick={handleUpdate} color="green">
				수정
			</Button>
			<Input
				label="총점 비교"
				type="checkbox"
				checked={stateForm[TYPE_STATEFORM.IS_TOTAL_ONLY]}
				onChange={handleIsTotalOnly}
			/>
		</form>
	);
}

export default MedalForm;
