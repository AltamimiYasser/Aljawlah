import { ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILED } from '../actions/types';
const initialState = { isAdmin: null };

const admin = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_SUCCESS:
      return { isAdmin: true };
    case ADMIN_LOGIN_FAILED:
      return { isAdmin: false };
    default:
      return state;
  }
};

export default admin;
