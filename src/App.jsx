import styles from './styles/App.module.css';
import MedalTable from './component/MedalTable';
import MedalForm from './component/MedalForm';
import { useState } from 'react';

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
					onDeleteRecord={(idx) =>
						setStateRecords((prev) => {
							const deletedRecords = prev.filter(
								(_, i) => i !== idx,
							);
							localStorage.setItem(
								'records',
								JSON.stringify(deletedRecords),
							);
							return deletedRecords;
						})
					}
					isTotalOnly={stateForm.isTotalOnly}
				/>
			</div>
		</div>
	);
}

export default App;
