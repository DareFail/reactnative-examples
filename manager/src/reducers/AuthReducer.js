import {
  EMAILED_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_LOADING
 } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action)


  switch (action.type) {
    case EMAILED_CHANGED:
      return { ...state, email: action.payload, error: '' };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state,
        user: action.payload,
        ...INITIAL_STATE };
    case LOGIN_USER_FAIL:
      return { ...state, loading: false, error: 'Authentication Failed' };
    case LOGIN_USER_LOADING:
      return { ...state, loading: true, error: '' }
    default:
      return state;
  }
}
