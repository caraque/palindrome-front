import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './';

export default createStore(combineReducers(reducers), applyMiddleware(...[thunkMiddleware]));
