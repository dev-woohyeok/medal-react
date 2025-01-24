import styles from '../styles/Input.module.css';
function Input({ label, onChange, onFocus, ...props }) {
	return (
		<label className={styles.label}>
			<span className={styles.label_text}>{label}</span>
			<input
				className={styles.input}
				onChange={onChange}
				onFocus={onFocus}
				{...props}
			/>
		</label>
	);
}

export default Input;
