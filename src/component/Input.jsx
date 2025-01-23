import styles from '../styles/Input.module.css';
function Input({ label, value, onChange, onFocus, ...props }) {
	return (
		<label className={styles.label}>
			<span className={styles.label_text}>{label}</span>
			<input
				className={styles.input}
				value={value}
				onChange={onChange}
				onFocus={onFocus}
				{...props}
			/>
		</label>
	);
}

export default Input;
