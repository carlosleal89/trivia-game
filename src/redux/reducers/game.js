import { GET_QUESTIONS } from '../actions/gameAction';

const INITIAL_STATE = {
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    localStorage.setItem('questions', JSON.stringify(action.questions));
    return { ...state, questions: action.questions };
  default:
    return state;
  }
};

export default gameReducer;
