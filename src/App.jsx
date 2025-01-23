import styles from './styles/App.module.css';
import MedalTable from './component/MedalTable';
import MedalForm from './component/MedalForm';
import { useState } from 'react';
import { TYPE_LOCALSTORAGE, TYPE_STATEFORM } from './constant/type';

function App() {
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
					isTotalOnly={stateForm[TYPE_STATEFORM.IS_TOTAL_ONLY]}
				/>
			</div>
		</div>
	);
}

export default App;
