import style_input from '../styles/Input.module.css';

function Selector({
	options = [],
	onChange,
	label,
	value = '',
	placeholder = '선택해주세요',
	...props
}) {
	return (
		<label className={style_input.label}>
			<span className={style_input.label_text}>{label}</span>
			<select
				className={style_input.input}
				value={value}
				onChange={onChange}
				{...props}
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
