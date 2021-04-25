import { v4 as uuid } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './types';

const setAlert = (msg, alertColor, timeOut = 5000) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertColor, id },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, timeOut);
};

export default setAlert;
