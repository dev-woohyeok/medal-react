import { BUTTON_COLOR_TYPE } from '../constant/type';
import styles from '../styles/Button.module.css';

function Button({ onClick, color, ...props }) {
	return (
		<button
			className={`${styles.btn} ${styles[BUTTON_COLOR_TYPE[color]]}`}
			onClick={onClick}
			{...props}
		>
			{props.children}
		</button>
	);
}

export default Button;
