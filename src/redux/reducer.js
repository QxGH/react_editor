import { CHANGE_INPUT_TYPE, ADD_LIST_ITEM, DELETE_LIST_ITEM, CHANGE_EDITOR_LIST, CHANGE_EDITOR_INDEX } from './actionTypes';

const defaultState = {
	inputValue: '',
	list: [],
	editorList: [],
	editorIndex: ''
}

export default (state=defaultState, action)=>{
	// console.log(state,action);
	if(action.type === CHANGE_INPUT_TYPE){
		// 深拷贝，reducer不允许直接修改state
		const newState = JSON.parse(JSON.stringify(state));
		newState.inputValue = action.value;
		return newState;
	}

	if(action.type === ADD_LIST_ITEM){
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(newState.inputValue);
		newState.inputValue = '';
		return newState;
	}

	if(action.type === DELETE_LIST_ITEM){
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(newState.index,1);
		return newState;
	}

	if(action.type === CHANGE_EDITOR_LIST){
		const newState = JSON.parse(JSON.stringify(state));
		newState.editorList = action.value;
		return newState;
	}

	if(action.type === CHANGE_EDITOR_INDEX){
		const newState = JSON.parse(JSON.stringify(state));
		newState.editorIndex = action.value;
		return newState;
	}

	return state;
}