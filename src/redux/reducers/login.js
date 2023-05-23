import { ADD_USER } from '../actions/loginAction';

const INITIAL_STATE = {
  user: {
    email: '',
    name: '',
  },
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  token: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return { ...state, user: action.payload, player: { name: action.payload.name } };
  default:
    return state;
  }
};

export default loginReducer;
