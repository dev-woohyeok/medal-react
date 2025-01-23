import styles from '../styles/MedalTable.module.css';
import styles_btn from '../styles/Button.module.css';
import Button from './Button';

function MedalTable({ records, onDeleteRecord, isTotalOnly }) {
	function handleClick(index) {
		onDeleteRecord((prev) => {
			const newData = prev.records.filter((_, i) => i !== index);
			localStorage.setItem('data', JSON.stringify(newData));
			return newData;
		});
	}

	// 필터 설정에 따라 정렬 방식 변경
	isTotalOnly
		? records.sort((a, b) => {
				const totalA = a.gold + a.silver + a.bronze;
				const totalB = b.gold + b.silver + b.bronze;

				if (totalA !== totalB) return totalB - totalA;
				return a.country.localeCompare(b.country);
		  })
		: records.sort((a, b) => {
				if (a.gold !== b.gold) return b.gold - a.gold;
				return a.country.localeCompare(b.country);
		  });

	return (
		<table className={styles.table}>
			<thead className={styles.thead}>
				<tr className={styles.tr}>
					<th className={styles.th}>국가명</th>
					<th className={styles.th}>금메달수</th>
					<th className={styles.th}>은메달수</th>
					<th className={styles.th}>동메달수</th>
					<th className={styles.th}>총메달수</th>
				</tr>
			</thead>
			<tbody className={styles.tbody}>
				{records.map((item, idx) => (
					<tr className={styles.tr} key={idx}>
						<td className={styles.td}>{item.country}</td>
						<td className={styles.td}>{item.gold}</td>
						<td className={styles.td}>{item.silver}</td>
						<td className={styles.td}>{item.bronze}</td>
						<td className={styles.td}>
							{item.gold + item.silver + item.bronze}
						</td>
						<td className={styles.td}>
							<Button
								label="삭제"
								type="delete"
								onClick={() => handleClick(idx)}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default MedalTable;
