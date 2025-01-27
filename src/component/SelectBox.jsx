import { useState, useContext, createContext } from 'react';
import styles from './../styles/SelectBox.module.css';
import { STLYES_SELECTBOX } from '../constant/type';
import Input from './Input';
const SelectContext = createContext();

function SelectBox({ items = [], value, onSelect, children }) {
	/**
	 * Context API 를 사용해서 Select 컴퍼넌트 내부의 데이터를 효율적으로 관리하는 것도 방법일듯
	 * -> 상태관리 라이브러리 사용하면 쓸일이 별로 없긴함
	 * ...props 로 받으면, 편하지만, props를 정의하지 않으면 어떤 props를 받는지 알기 어렵지 안나?
	 * props를 명시적으로 적어야할텐데... 이걸 type으로 관리하면 되는건가?
	 * -> 한번에 객체로 묶어서 관리하는 방법을 많이쓴다고함, 일단 적는게 맞다
	 */

	const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태

	const filteredItems = items.filter((item) =>
		item.toLowerCase().includes(value.toLowerCase()),
	);

	const contextValue = {
		isOpen,
		setIsOpen,
		filteredItems,
		value,
		onSelect,
	};

	return (
		<SelectContext.Provider value={contextValue}>
			<div className={styles[STLYES_SELECTBOX.CONTAINER]}>{children}</div>
		</SelectContext.Provider>
	);
}

function useSelectContext() {
	const context = useContext(SelectContext);
	if (!context) {
		throw new Error(
			'Select 내부에서만 사용 가능한 컴포넌트입니다. <Select>로 감싸주세요.',
		);
	}
	return context;
}

function SelectInput({ label, placeholder }) {
	const { setIsOpen, onSelect, value } = useSelectContext();

	const handleFocus = (e) => {
		setIsOpen(true);
		e.target.select();
	};

	const handleBlur = () => {
		setIsOpen(false);
	};

	const handleChange = (e) => {
		e.target.value.trim().length > 0 && setIsOpen(true);
		onSelect(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.stopPropagation();
			e.preventDefault();
		}
	};

	return (
		<Input
			type="text"
			label={label}
			value={value}
			onKeyDown={handleKeyDown}
			onChange={handleChange}
			onFocus={handleFocus}
			onBlur={handleBlur}
			placeholder={placeholder}
		/>
	);
}

function SelectList() {
	const { isOpen, filteredItems } = useSelectContext();
	if (!isOpen) return null;

	return (
		<div className={styles[STLYES_SELECTBOX.LIST]}>
			{filteredItems.length === 0 ? (
				<div className={styles[STLYES_SELECTBOX.NO_ITEM]}>
					검색 결과가 없습니다.
				</div>
			) : (
				filteredItems.map((value) => (
					<ListItem key={value} value={value} />
				))
			)}
		</div>
	);
}

function ListItem({ value: itemValue }) {
	const { onSelect, setIsOpen, value: selectedValue } = useSelectContext();
	const handleClick = () => {
		onSelect(itemValue);
		setIsOpen(false);
	};
	const handleMouseDown = (e) => {
		e.preventDefault();
	};

	return (
		<div
			className={styles[STLYES_SELECTBOX.ITEM]}
			role="button"
			onMouseDown={handleMouseDown}
			onClick={handleClick}
			tabIndex={0}
		>
			{itemValue}
		</div>
	);
}

SelectBox.Input = SelectInput;
SelectBox.List = SelectList;

export default SelectBox;
