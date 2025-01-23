function MedalForm() {
	return (
		<form className={styles.form}>
			<Selector
				label="국가"
				options={OLYMPIC_COUNTRIES}
				value={state.country}
				onChange={(value) =>
					setState((prev) => ({ ...prev, country: value }))
				}
			/>
			<Input
				label="금메달"
				value={state.gold}
				onChange={(value) =>
					setState((prev) => ({ ...prev, gold: value }))
				}
				type="number"
			/>
			<Input
				label="은메달"
				value={state.silver}
				onChange={(value) =>
					setState((prev) => ({ ...prev, silver: value }))
				}
				type="number"
			/>
			<Input
				label="동메달"
				value={state.bronze}
				onChange={(value) =>
					setState((prev) => ({ ...prev, bronze: value }))
				}
				type="number"
			/>
			<Button label="등록" type="create" onClick={handleCreate} />
			<Button label="수정" type="update" onClick={handleUpdate} />
			<label>
				총점 비교
				<input
					type="checkbox"
					checked={state.isTotalOnly}
					onChange={handleIsTotalOnly}
				/>
			</label>
		</form>
	);
}

export default MedalForm;
