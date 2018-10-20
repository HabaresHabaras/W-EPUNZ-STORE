export const SUBMIT_SIGNUP_FORM = 'signUp/SUBMIT_SIGNUP_FORM';

const initialState = {
  form: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_SIGNUP_FORM:
      return { ...state, form: action.payload };

    default:
      return { ...state };
  }
};