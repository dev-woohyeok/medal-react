import { OLYMPIC_COUNTRIES_LIST } from '../constant/type';
import styles from '../styles/MedalForm.module.css';
import Selector from './Selector';
import Input from './Input';
import Button from './Button';
import PropTypes from 'prop-types';

function MedalForm({ stateForm, setStateForm, stateRecords, setStateRecords }) {
	function handleCreate(e) {
		e.preventDefault();
		if (!stateForm.country) {
			alert('국가를 선택해주세요.');
			return;
		}

		// 중복 방지 알림
		if (stateRecords.some((item) => item.country === stateForm.country)) {
			alert('이미 등록된 국가입니다.');
			return;
		}

		setStateRecords((prevState) => {
			const newRecord = {
				country: stateForm.country,
				gold: stateForm.gold,
				silver: stateForm.silver,
				bronze: stateForm.bronze,
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
		if (!stateForm.country) {
			alert('국가를 선택해주세요.');
			return;
		}
		// 국가 존재 여부 확인
		if (!stateRecords.some((item) => item.country === stateForm.country)) {
			alert('해당 국가는 등록되지 않은 국가입니다.');
			return;
		}

		// 수정해야하는 국가 메달 업데이트 하기
		setStateRecords((prevState) => {
			const newRecord = {
				country: stateForm.country,
				gold: stateForm.gold,
				silver: stateForm.silver,
				bronze: stateForm.bronze,
			};
			const updatedRecords = prevState.map((item) =>
				item.country === stateForm.country ? newRecord : item,
			);
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
				value={stateForm.country}
				onChange={(e) => {
					setStateForm((prev) => ({
						...prev,
						country: e.target.value,
					}));
				}}
			/>
			<Input
				label="금메달"
				value={stateForm.gold}
				onChange={(e) => {
					const value = parseInt(e.target.value) || '';
					setStateForm((prev) => ({ ...prev, gold: value }));
				}}
				type="number"
			/>
			<Input
				label="은메달"
				value={stateForm.silver}
				onChange={(e) => {
					const value = parseInt(e.target.value) || '';
					setStateForm((prev) => ({ ...prev, silver: value }));
				}}
				type="number"
			/>
			<Input
				label="동메달"
				value={stateForm.bronze}
				onChange={(value) =>
					setStateForm((prev) => ({ ...prev, bronze: value }))
				}
				type="number"
			/>
			<Button onClick={handleCreate} color="g">
				등록
			</Button>
			<Button onClick={handleUpdate}>수정</Button>

			<Input
				label="총점 비교"
				type="checkbox"
				checked={stateForm.isTotalOnly}
				onChange={handleIsTotalOnly}
			/>
		</form>
	);
}

export default MedalForm;
