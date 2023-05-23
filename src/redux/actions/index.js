import { ADD_USER, GET_TOKEN } from './loginAction';

// Login Actions
export const addUser = (user) => ({ type: ADD_USER, payload: user });

export const getToken = (data) => ({ type: GET_TOKEN, payload: data }); // RESOLVED API

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(getToken(data)); // RESOLVED API
  } catch (error) {
    console.error(error);
  }
};
