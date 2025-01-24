export const TYPE_MEDAL = {
	GOLD: 'gold',
	SILVER: 'silver',
	BRONZE: 'bronze',
};
Object.freeze(TYPE_MEDAL);

export const STATE_FORM = {
	COUNTRY: 'country',
	GOLD: 'gold',
	SILVER: 'silver',
	BRONZE: 'bronze',
	IS_TOTAL_ONLY: 'isTotalOnly',
};
Object.freeze(STATE_FORM);

/**
 * 다음 개발시에는 styles 클래스명도 객체로 관리하는것을 고려하자
 */
export const TYPE_STYLES_MEDALTABLE = {
	NO_RECORD: 'no-record',
	TABLE: 'table',
	THEAD: 'thead',
	TBODY: 'tbody',
};
Object.freeze(TYPE_STYLES_MEDALTABLE);

export const STLYES_SELECTBOX = {
	CONTAINER: 'container',
	LIST: 'list',
	ITEM: 'item',
	ACTIVE: 'active',
};

export const TYPE_BUTTON_COLOR = {
	RED: 'red',
	BLUE: 'blue',
	GREEN: 'green',
};
Object.freeze(TYPE_BUTTON_COLOR);

export const TYPE_LOCALSTORAGE = {
	MEDALS_RECORD_LIST: 'records',
};
Object.freeze(TYPE_LOCALSTORAGE);
