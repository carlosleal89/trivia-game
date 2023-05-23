import { ADD_USER } from '../actions/loginAction';

const INITIAL_STATE = {
  user: {
    email: '',
    name: '',
  },
  token: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return { ...state, user: action.payload };
  // case GET_TOKEN:
  //   localStorage.setItem('token', action.payload.token);
    // return { ...state, token: action.payload };
  default:
    return state;
  }
};

export default loginReducer;
