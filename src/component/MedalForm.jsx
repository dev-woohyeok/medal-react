import { OLYMPIC_COUNTRIES_LIST } from '../constant/type';
import styles from '../styles/MedalForm.module.css';

function MedalForm(stateForm, setStateForm, records, setRecords) {
	return (
		<form className={styles.form}>
			<Selector
				label="국가"
				options={OLYMPIC_COUNTRIES_LIST}
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
			<Button onClick={handleCreate} color="g">
				등록
			</Button>
			<Button onClick={handleUpdate}>수정</Button>
			<label>
				총점 비교
				<input
					type="checkbox"
					checked={state.isTotalOnly}
					onChange={handleIsTotalOnly}
				/>
			</label>
		</form>
	);
}

export default MedalForm;
