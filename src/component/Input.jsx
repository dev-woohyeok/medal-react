import style_input from '../styles/Input.module.css';
function Input({ label, value, onChange, ...props }) {
	return (
		<label className={style_input.label}>
			<span className={style_input.label_text}>{label}</span>
			<input
				className={style_input.input}
				value={value}
				onChange={(e) => onChange(parseInt(e.target.value) || '')}
				onFocus={(e) => e.target.select()}
				min={0}
				{...props}
			/>
		</label>
	);
}

export default Input;
