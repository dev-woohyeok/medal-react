import styles from './App.module.css';
import MedalForm from './component/MedalForm';

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

	function handleCreate(e) {
		e.preventDefault();
		if (!stateForm.country) {
			alert('국가를 선택해주세요.');
			return;
		}

		// 중복 방지 알림
		if (
			stateForm.records.some((item) => item.country === stateForm.country)
		) {
			alert('이미 등록된 국가입니다.');
			return;
		}

		// 로컬스토리지에 등록하기
		const newRecord = {
			country: stateForm.country,
			gold: stateForm.gold,
			silver: stateForm.silver,
			bronze: stateForm.bronze,
		};

		setStateRecords((prevState) => {
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
		if (!stateForm.country) {
			alert('국가를 선택해주세요.');
			return;
		}
		// 국가 존재 여부 확인
		if (
			!stateForm.records.some(
				(item) => item.country === stateForm.country,
			)
		) {
			alert('해당 국가는 등록되지 않은 국가입니다.');
			return;
		}

		// 로컬스토리지에 수정하기
		s((prevState) => {
			const newRecord = {
				country: stateForm.country,
				gold: stateForm.gold,
				silver: stateForm.silver,
				bronze: stateForm.bronze,
			};
			const updatedRecords = prevState.records.map((item) =>
				item.country === stateForm.country ? newRecord : item,
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
				<MedalForm />
				<MedalTable
					records={state.records}
					onDeleteRecord={() => setState}
					isTotalOnly={state.isTotalOnly}
				/>
			</div>
		</div>
	);
}

export default App;
