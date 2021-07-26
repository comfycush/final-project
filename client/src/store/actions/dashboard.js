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

    fetch(`http://localhost:4000/`, {
      method: "GET",
      headers: { "access_token": localStorage.access_token}
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setDashboard(data));
<<<<<<< HEAD
=======
        console.log(data, "data fetch");
>>>>>>> c310ab0723b46d8315329034f146b7e15137716b
      })
      .catch(() => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
