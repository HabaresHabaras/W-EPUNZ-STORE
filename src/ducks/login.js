export const SUBMIT_LOGIN_FORM = 'login/SUBMIT_LOGIN_FORM';
export const GET_LOGIN_INFO = 'login/GET_LOGIN_INFO';

const initialState = {
  form: null,
  validated: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN_FORM:
      return { ...state, form: action.payload, validated: false };

      case GET_LOGIN_INFO:
      return { ...state, form: null, validated: true };

    default:
      return { ...state };
  }
};
