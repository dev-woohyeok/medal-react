function NumberInput({ label, value, onChange }) {
	function handleChange(e) {
		const value = Number(e.target.value);
	}

	return (
		<label>
			{label}
			<input
				type="number"
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
			/>
		</label>
	);
}

export default NumberInput;
