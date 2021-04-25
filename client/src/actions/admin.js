import axios from 'axios';

import setAlert from './alert';
import { ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILED } from './types';

import { SUCCESS_COLOR, DANGER_COLOR } from '../utils/styleConstants';

export const logAdminIn = ({ username, password }) => async (dispatch) => {
  try {
    await axios.post('/api/auth/admin/login', { username, password });
    dispatch(setAlert('admin login successfully', SUCCESS_COLOR));
    dispatch({ type: ADMIN_LOGIN_SUCCESS });
  } catch (err) {
    dispatch(setAlert('Wrong username or password', DANGER_COLOR));
    dispatch({ type: ADMIN_LOGIN_FAILED });
  }
};
