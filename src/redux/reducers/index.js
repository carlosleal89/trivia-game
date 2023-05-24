import { combineReducers } from 'redux';
import loginReducer from './login';
import gameReducer from './game';
import playerReducer from './player';

const rootReducer = combineReducers({
  login: loginReducer,
  game: gameReducer,
  player: playerReducer,
});

export default rootReducer;
