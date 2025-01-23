import style_btn from '../styles/Button.module.css';

function Button({ label, type, onClick }) {
	return (
		<button
			className={`${style_btn.btn} ${style_btn[type]}`}
			onClick={onClick}
		>
			{label}
		</button>
	);
}

export default Button;
