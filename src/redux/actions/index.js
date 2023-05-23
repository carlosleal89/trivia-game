import { ADD_USER } from './loginAction';
import { GET_QUESTIONS } from './gameAction';

// Login Actions
export const addUser = (user) => ({ type: ADD_USER, payload: user });

export const fetchToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Game actions
export const getQuestions = (questions) => ({ type: GET_QUESTIONS, questions });

export const fetchQuestions = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    dispatch(getQuestions(questions));
  } catch (error) {
    console.error(error);
  }
};
