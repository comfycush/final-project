import { SET_TEMPLATE } from "../actionTypes";

const initialState = {
  data: {},
};

export default function templateReducer(state = initialState, action) {
  if (action.type === SET_TEMPLATE) {
    return { ...state, data: action.payload };
  }
  return state;
}
