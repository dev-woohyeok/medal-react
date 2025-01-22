function Selector({
	options = [],
	onChange,
	value = '',
	placeholder = '선택해주세요',
}) {
	return (
		<label>
			국가:
			<select
				className=""
				value={value}
				onChange={(e) => onChange(e.target.value)}
			>
				<option value="" disabled hidden>
					{placeholder}
				</option>

				{options.map((option, idx) => (
					<option key={idx} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
}

export default Selector;
