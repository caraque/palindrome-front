import {SET_SEARCHTEXT, GET_SEARCHTEXT} from './type';
import initialState from './initial';

const headerSearchText = (state = initialState, action) => {
	switch (action.type) {
		case SET_SEARCHTEXT:
			return {...state, searchText: action.payload};
		case GET_SEARCHTEXT:
			return {...state, searchText: action.payload};
		default:
			return state;
	}
};

export default {headerSearchText};
