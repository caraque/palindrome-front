import {SET_SEARCHTEXT, GET_SEARCHTEXT} from './type';

export const setSearchedText = (value) => async dispatch => {
    return dispatch({type: SET_SEARCHTEXT, payload: value});
}

export const getSearchedText = (value) => async dispatch => {
    return dispatch({type: GET_SEARCHTEXT, payload: value});
}

export default {
    setSearchedText,
};
