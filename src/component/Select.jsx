import styles from '../styles/Input.module.css';

function Select({
	options = [],
	label,
	placeholder = '선택해주세요',
	...props
}) {
	return (
		<label className={styles.label}>
			<span className={styles.label_text}>{label}</span>
			<select className={styles.input} {...props}>
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

export default Select;
