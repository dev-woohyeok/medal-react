import PropTypes from 'prop-types';

function NumberInput({ label, value, onChange }) {
	return (
		<label>
			{label}
			<input
				type="number"
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				min={0}
			/>
		</label>
	);
}

export default NumberInput;
