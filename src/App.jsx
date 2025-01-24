import styles from './styles/App.module.css';
import MedalTable from './component/MedalTable';
import MedalForm from './component/MedalForm';
import { useState } from 'react';
import { TYPE_LOCALSTORAGE, STATE_FORM } from './constant/type';

function App() {
	/**
	 * 다음에는 커스텀 훅을 사용해서 이벤트 핸들러들만 반환받아서 한번에 props로 관리하는 것도 고려하기
	 * 결국 자식에게 setForm 데이터만 넘기고, onClick, onChange 등 이벤트 로직들은 부모에서 핸들러만 넘기는 방식으로
	 * 관리하면 가독성이 개선되지않을까?
	 */
	const [stateForm, setStateForm] = useState({
		country: '',
		gold: 0,
		silver: 0,
		bronze: 0,
		isTotalOnly: false,
	});

	const [stateRecords, setStateRecords] = useState(
		JSON.parse(localStorage.getItem('records')) || [],
	);

	function handleDeleteRecord(idx) {
		setStateRecords((prev) => {
			const deletedRecords = prev.filter((_, i) => i !== idx);
			localStorage.setItem(
				TYPE_LOCALSTORAGE.MEDALS_RECORD_LIST,
				JSON.stringify(deletedRecords),
			);
			return deletedRecords;
		});
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1 className={styles.title}>메달 통계</h1>
				<MedalForm
					stateForm={stateForm}
					setStateForm={setStateForm}
					stateRecords={stateRecords}
					setStateRecords={setStateRecords}
				/>
				<MedalTable
					records={stateRecords}
					onDeleteRecord={handleDeleteRecord}
					isTotalOnly={stateForm[STATE_FORM.IS_TOTAL_ONLY]}
				/>
			</div>
		</div>
	);
}

export default App;
