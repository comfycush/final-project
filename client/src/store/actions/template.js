import { SET_TEMPLATE } from "../actionTypes";

export function setTemplate(input) {
  return {
    type: SET_TEMPLATE,
    payload: input,
  };
}

export function getTemplateId(id) {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:3000/template${id}`);
    const data = await response.json();
    dispatch(setTemplate(data));
  };
}
