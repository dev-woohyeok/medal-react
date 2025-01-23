import { MEDALTABLE_RANKING_COLOR } from '../constant/type';
import styles from '../styles/MedalTable.module.css';
import Button from './Button';

function MedalTable({ records, onDeleteRecord, isTotalOnly }) {
	function getRowClass(index) {
		return styles[
			MEDALTABLE_RANKING_COLOR[index] || MEDALTABLE_RANKING_COLOR.default
		];
	}

	const sortedRecords = [...records].sort((a, b) => {
		if (isTotalOnly) {
			const totalA = a.gold + a.silver + a.bronze;
			const totalB = b.gold + b.silver + b.bronze;

			if (totalA !== totalB) return totalB - totalA;
			return a.country.localeCompare(b.country);
		} else {
			if (a.gold !== b.gold) return b.gold - a.gold;
			return a.country.localeCompare(b.country);
		}
	});

	return (
		<table className={styles.table}>
			<thead className={styles.thead}>
				<tr>
					<th>국가명</th>
					<th>금메달수</th>
					<th>은메달수</th>
					<th>동메달수</th>
					<th>총메달수</th>
					<th>액션</th>
				</tr>
			</thead>
			<tbody className={styles.tbody}>
				{sortedRecords.map((item, idx) => (
					<tr
						className={`${styles.tbody} ${getRowClass(idx)}`}
						key={idx}
					>
						<td>{item.country}</td>
						<td>{item.gold}</td>
						<td>{item.silver}</td>
						<td>{item.bronze}</td>
						<td>{item.gold + item.silver + item.bronze}</td>
						<td>
							<Button
								color="red"
								onClick={() => onDeleteRecord(idx)}
							>
								삭제
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default MedalTable;
