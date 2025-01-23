import style_input from '../styles/Input.module.css';

function Selector({
	options = [],
	onChange,
	value = '',
	label,
	placeholder = '선택해주세요',
}) {
	return (
		<label className={style_input.label}>
			<span className={style_input.label_text}>{label}</span>
			<select
				className={style_input.input}
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
