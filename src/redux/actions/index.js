import {
  ADD_USER,
} from './loginAction';

export const addUser = (user) => ({ type: ADD_USER, payload: user });

export const getToken = (data) => ({ type: GET_CURRENCIES, payload: data });

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(getToken(data));
  } catch (error) {
    console.error(error);
  }
};
