import {
  DATA_POSTED_ERROR_RESPONSE,
  DATA_POSTED_WITH_SUCCESS,
  FORM_SUBMIT,
  INCREMENT_FORM_INDEX,
  DECREMENT_FORM_INDEX,
} from "./action.constant";

const initialState = {
  formValues: {},
  formIndex: 0,
  error: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_POSTED_WITH_SUCCESS: {
      return { ...state, payload: action.payload };
    }
    case DATA_POSTED_ERROR_RESPONSE: {
      return { ...state, error: action.payload };
    }
    case FORM_SUBMIT: {
      return { ...state, formValues: action.payload };
    }
    case INCREMENT_FORM_INDEX: {
      return { ...state, formIndex: action.payload + 1 };
    }
    case DECREMENT_FORM_INDEX: {
      return { ...state, formIndex: action.payload - 1 };
    }
    default:
      return state;
  }
};

export default rootReducer;
