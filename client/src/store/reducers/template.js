import {
  SET_TEMPLATE,
  SET_TEMPLATE_ERROR,
  SET_TEMPLATE_LOADING,
} from "../actionTypes";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isDeploy: true,
};

export default function templateReducer(state = initialState, action) {
  if (action.type === SET_TEMPLATE) {
    return { ...state, data: action.payload };
  } else if (action.type === SET_TEMPLATE_LOADING) {
    return { ...state, isLoading: action.payload };
  } else if (action.type === SET_TEMPLATE_ERROR) {
    return { ...state, isError: action.payload };
  }
  return state;
}
