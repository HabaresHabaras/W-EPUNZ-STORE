export const SUBMIT_SIGNUP_FORM = 'signUp/SUBMIT_SIGNUP_FORM';
export const FORM_SUBMITED = 'signUp/FORM_SUBMITTED';

const initialState = {
  form: null,
  submited: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_SIGNUP_FORM:
      return { ...state, form: action.payload };

      case FORM_SUBMITED:
      return { ...state, form: null, submited: true };

    default:
      return { ...state };
  }
};