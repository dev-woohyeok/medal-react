import { TYPE_LOCALSTORAGE, STATE_FORM } from '../constant/type';

import styles from './../styles/MedalForm.module.css';
import Input from './Input';
import Button from './Button';
import { OLYMPIC_COUNTRIES_LIST } from '../constant/constant';
import SelectBox from './SelectBox';

function MedalForm({ stateForm, setStateForm, stateRecords, setStateRecords }) {
	/**
	 * 차후 코드 작성시 비지니스 로직들은 부모 컴퍼넌트로부터 이벤트핸들러를 전달받아서 사용하는것으로 하고,
	 * 자식에서 반복적으로 호출되는 동일한 컴퍼넌트들의 경우 객체를 통해 관리하는 방식으로 변경하는 것을 고려하자.
	 */

	function resetForm() {
		setStateForm((prev) => ({
			...prev,
			gold: 0,
			silver: 0,
			bronze: 0,
			country: '',
		}));
	}

	function handleCreate(e) {
		e.preventDefault();
		if (!stateForm[STATE_FORM.COUNTRY]) {
			alert('국가를 선택해주세요.');
			resetForm();
			return;
		}

		if (
			stateRecords.some(
				(item) => item.country === stateForm[STATE_FORM.COUNTRY],
			)
		) {
			alert('이미 등록된 국가입니다.');
			resetForm();
			return;
		}

		if (
			OLYMPIC_COUNTRIES_LIST.indexOf(stateForm[STATE_FORM.COUNTRY]) === -1
		) {
			alert('등록할 수 없는 국가입니다.');
			resetForm();
			return;
		}

		setStateRecords((prevState) => {
			const newRecord = {
				country: stateForm[STATE_FORM.COUNTRY],
				gold: stateForm[STATE_FORM.GOLD],
				silver: stateForm[STATE_FORM.SILVER],
				bronze: stateForm[STATE_FORM.BRONZE],
			};
			const updatedRecords = [...prevState, newRecord];
			localStorage.setItem('records', JSON.stringify(updatedRecords));
			return updatedRecords;
		});

		resetForm();
	}

	function handleUpdate(e) {
		e.preventDefault();
		if (!stateForm[STATE_FORM.COUNTRY]) {
			alert('국가를 선택해주세요.');
			resetForm();
			return;
		}

		if (
			!stateRecords.some(
				(item) => item.country === stateForm[STATE_FORM.COUNTRY],
			)
		) {
			alert('해당 국가는 등록되지 않은 국가입니다.');
			resetForm();
			return;
		}

		setStateRecords((prevState) => {
			const newRecord = {
				country: stateForm[STATE_FORM.COUNTRY],
				gold: stateForm[STATE_FORM.GOLD],
				silver: stateForm[STATE_FORM.SILVER],
				bronze: stateForm[STATE_FORM.BRONZE],
			};
			const updatedRecords = prevState.map((item) =>
				item.country === stateForm[STATE_FORM.COUNTRY]
					? newRecord
					: item,
			);
			localStorage.setItem(
				TYPE_LOCALSTORAGE.MEDALS_RECORD_LIST,
				JSON.stringify(updatedRecords),
			);
			return updatedRecords;
		});
		resetForm();
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
		<form
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<SelectBox
				items={OLYMPIC_COUNTRIES_LIST}
				value={stateForm[STATE_FORM.COUNTRY]}
				onSelect={(value) =>
					setStateForm((prev) => ({
						...prev,
						country: value,
					}))
				}
			>
				<SelectBox.Input
					label="국가"
					placeholder="국가를 선택해주세요"
				/>
				<SelectBox.List />
			</SelectBox>

			<Input
				label="금메달"
				value={stateForm[STATE_FORM.GOLD]}
				onChange={(e) => handleOnChange(e, STATE_FORM.GOLD)}
				onFocus={(e) => e.target.select()}
				type="number"
				min={0}
			/>
			<Input
				label="은메달"
				value={stateForm[STATE_FORM.SILVER]}
				onChange={(e) => handleOnChange(e, STATE_FORM.SILVER)}
				onFocus={(e) => e.target.select()}
				type="number"
				min={0}
			/>
			<Input
				label="동메달"
				value={stateForm[STATE_FORM.BRONZE]}
				onChange={(e) => handleOnChange(e, STATE_FORM.BRONZE)}
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
				checked={stateForm[STATE_FORM.IS_TOTAL_ONLY]}
				onChange={handleIsTotalOnly}
			/>
		</form>
	);
}

export default MedalForm;
