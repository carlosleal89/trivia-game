import { combineReducers } from 'redux';
import loginReducer from './login';
import gameReducer from './game';

const rootReducer = combineReducers({ login: loginReducer, game: gameReducer });

export default rootReducer;
