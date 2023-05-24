import md5 from 'crypto-js/md5';
import { ADD_SCORE } from '../actions/playerAction';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

let previousRanking = [];
if (localStorage.getItem('ranking')) {
  previousRanking = JSON.parse(localStorage.getItem('ranking'));
}

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    localStorage.setItem('ranking', JSON.stringify([
      ...previousRanking,
      {
        name: action.user.nameInput,
        score: state.score + action.score,
        picture: `https://www.gravatar.com/avatar/${md5(action.user.emailInput).toString()}`,
      },
    ]));
    return {
      ...state,
      name: action.user.nameInput,
      assertions: state.assertions + 1,
      score: state.score + action.score,
      gravatarEmail: action.user.emailInput,
    };
  default:
    return state;
  }
};

export default playerReducer;
