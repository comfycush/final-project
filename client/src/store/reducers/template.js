import {
  SET_TEMPLATE,
  SET_TEMPLATE_ERROR,
  SET_TEMPLATE_LOADING,
  SET_COLOR_ARRAY
} from "../actionTypes";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isDeploy: true,
  colorArray: []
};

export default function templateReducer(state = initialState, action) {
  if (action.type === SET_TEMPLATE) {
    return { ...state, data: action.payload };
  } else if (action.type === SET_TEMPLATE_LOADING) {
    return { ...state, isLoading: action.payload };
  } else if (action.type === SET_TEMPLATE_ERROR) {
    return { ...state, isError: action.payload };
  } else if (action.type === SET_COLOR_ARRAY) {
    return { ...state, colorArray: action.payload };
  }
  return state;
}
