import { SET_DASHBOARD, SET_LOADING, SET_ERROR } from "../actionTypes";

const initialState = {
  data: [],
  loading: false,
  err: false,
};

export default function dashboardReducer(state = initialState, action) {
  if (action.type === SET_DASHBOARD) {
    return { ...state, data: action.payload };
  } else if (action.type === SET_LOADING) {
    return { ...state, loading: action.payload };
  } else if (action.type === SET_ERROR) {
    return { ...state, err: action.payload };
  }
  return state;
}
