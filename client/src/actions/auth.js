import { LOGGED_IN, LOGGED_OUT, REGISTERED } from './types';

export const loggedIn = (payload) => (dispatch) => {
  dispatch({
    type: LOGGED_IN,
    payload,
  });
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  // try {
  //   const res = await axios.post('/api/users', body, config);
  dispatch({
    type: REGISTERED,
    payload: { name, email, password },
  });

  // dispatch(loadUser());
  // dispatch(setAlert('Ny användare skapad!', 'success'));
  // } catch (err) {
  //   const errors = err.response.data.errors;

  //   if (errors) {
  //     errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
  //   }
  //   dispatch({
  //     type: REGISTER_FAIL,
  //   });
  // }
};
