import {
  SET_TEMPLATE,
  SET_TEMPLATE_LOADING,
  SET_TEMPLATE_ERROR,
} from "../actionTypes";

export function setTemplate(input) {
  return {
    type: SET_TEMPLATE,
    payload: input,
  };
}

export function setIsLoading(input) {
  return {
    type: SET_TEMPLATE_LOADING,
    payload: input,
  };
}

export function setIsError(input) {
  return {
    type: SET_TEMPLATE_ERROR,
    payload: input,
  };
}

export function getTemplateId(id) {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`http://localhost:3001/template/${id}`);
      const data = await response.json();
      dispatch(setTemplate(data));
    } catch (err) {
      console.log(err, "<<< ERROR DI ACTIONS");
      dispatch(setIsError(true));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}
