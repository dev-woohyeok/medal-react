import { MEDALTABLE_RANKING_COLOR } from '../constant/constant';
import { STATE_FORM, TYPE_STYLES_MEDALTABLE } from '../constant/type';
import styles from '../styles/MedalTable.module.css';
import Button from './Button';

function MedalTable({ records, onDeleteRecord, isTotalOnly }) {
	if (records.length === 0) {
		return (
			<div className={styles[TYPE_STYLES_MEDALTABLE.NO_RECORD]}>
				<p>통계자료가 존재하지 않습니다.</p>
			</div>
		);
	}

	const getTotalMedals = (item) => {
		return (
			item[STATE_FORM.GOLD] +
			item[STATE_FORM.SILVER] +
			item[STATE_FORM.BRONZE]
		);
	};

	const compareRecords = (a, b) => {
		if (isTotalOnly) {
			// 총메달수 기준 정렬
			const totalA = getTotalMedals(a);
			const totalB = getTotalMedals(b);
			if (totalA !== totalB) {
				return totalB - totalA;
			}
			return a.country.localeCompare(b.country);
		} else {
			// 금메달 기준 정렬
			if (a.gold !== b.gold) {
				return b.gold - a.gold; // 내림차순
			}
			return a.country.localeCompare(b.country);
		}
	};

	const sortedRecords = [...records].sort(compareRecords);

	const renderRow = (item, idx) => {
		const rowColor =
			styles[
				MEDALTABLE_RANKING_COLOR[idx] ||
					MEDALTABLE_RANKING_COLOR.default
			];
		return (
			<tr key={idx} className={rowColor}>
				<td>{item.country}</td>
				<td>{item.gold}</td>
				<td>{item.silver}</td>
				<td>{item.bronze}</td>
				<td>{item.gold + item.silver + item.bronze}</td>
				<td>
					<Button color="red" onClick={() => onDeleteRecord(idx)}>
						삭제
					</Button>
				</td>
			</tr>
		);
	};

	return (
		<table className={styles[TYPE_STYLES_MEDALTABLE.TABLE]}>
			<thead className={styles[TYPE_STYLES_MEDALTABLE.THEAD]}>
				<tr>
					<th>국가명</th>
					<th>금메달수</th>
					<th>은메달수</th>
					<th>동메달수</th>
					<th>총메달수</th>
					<th>액션</th>
				</tr>
			</thead>
			<tbody className={styles[TYPE_STYLES_MEDALTABLE.TBODY]}>
				{sortedRecords.map(renderRow)}
			</tbody>
		</table>
	);
}

export default MedalTable;
