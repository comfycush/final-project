import {
  SET_TEMPLATE,
  SET_TEMPLATE_LOADING,
  SET_TEMPLATE_ERROR,
  SET_COLOR_ARRAY
} from "../actionTypes";
import axios from "axios";
import convert from 'color-convert'

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

export function setColorArray(input) {
  return {
    type: SET_COLOR_ARRAY,
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

export function generateColorArray() {
  return dispatch => {
    axios({
      url: `http://colormind.io/api/`,
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { model:"default" }
  })
  .then(({data}) => {
      let colorArray = data.result.map( el => `#${convert.rgb.hex(el)}`)
      dispatch(setColorArray(colorArray))
      localStorage.setItem('colorArray', JSON.stringify(colorArray))
  })
  .catch(err => console.log(err, `ini error`))
  }
}
