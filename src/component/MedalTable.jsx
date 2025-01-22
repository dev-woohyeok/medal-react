import React from 'react';

function MedalTable({ records, onDeleteRecord, isTotalOnly }) {
	function handleClick(index) {
		onDeleteRecord((prev) => {
			const newData = prev.filter((_, i) => i !== index);
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
		<table>
			<thead>
				<tr>
					<th>국가명</th>
					<th>금메달수</th>
					<th>은메달수</th>
					<th>동메달수</th>
					<th>총메달수</th>
				</tr>
			</thead>
			<tbody>
				{records.map((item, idx) => (
					<tr key={idx}>
						<td>{item.country}</td>
						<td>{item.gold}</td>
						<td>{item.silver}</td>
						<td>{item.bronze}</td>
						<td>{item.gold + item.silver + item.bronze}</td>
						<td>
							<button onClick={() => handleClick(idx)}>
								삭제
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default MedalTable;
