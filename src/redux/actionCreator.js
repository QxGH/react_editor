import { ADD_LIST_ITEM , DELETE_LIST_ITEM, CHANGE_INPUT_TYPE, CHANGE_EDITOR_LIST, CHANGE_EDITOR_INDEX } from './actionTypes';

export const getChangeItemAction = (value) => ({
	type: CHANGE_INPUT_TYPE,
	value
});

export const getAddItemAction = () => ({
	type: ADD_LIST_ITEM
});

export const deleteItemAction = (index) => ({
	type: DELETE_LIST_ITEM,
	index
});

export const changeEditorList = (value) => ({
	type: CHANGE_EDITOR_LIST,
	value
});

export const changeEditorIndex = (value) => ({
	type: CHANGE_EDITOR_INDEX,
	value
});