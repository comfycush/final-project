import { SET_DASHBOARD, SET_ERROR, SET_LOADING } from "../actionTypes";

export function setDashboard(input) {
  return {
    type: SET_DASHBOARD,
    payload: input,
  };
}

export function setError(input) {
  return {
    type: SET_ERROR,
    payload: input,
  };
}

export function setLoading(input) {
  return {
    type: SET_LOADING,
    payload: input,
  };
}

export function fetchDashboard() {
  return (dispatch) => {
    dispatch(setLoading(true));

    fetch(`http://localhost:3001/template`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // dispatch(setDashboard(data));
        console.log(data, "data fetch");
      })
      .catch(() => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
