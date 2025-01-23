import styles from '../styles/Button.module.css';

function Button({ onClick, color, ...props }) {
	return (
		<button
			className={`${styles.btn} ${styles[color]}`}
			onClick={onClick}
			{...props}
		>
			{props.children}
		</button>
	);
}

export default Button;
