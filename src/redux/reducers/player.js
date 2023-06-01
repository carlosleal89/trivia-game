// import md5 from 'crypto-js/md5';
import { ADD_SCORE, CLEAR_SCORE } from '../actions/playerAction';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return {
      ...state,
      name: action.user.nameInput,
      assertions: action.score !== 0 ? state.assertions + 1 : state.assertions,
      score: state.score + action.score,
      gravatarEmail: action.user.emailInput,
    };
  case CLEAR_SCORE:
    return {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default playerReducer;
