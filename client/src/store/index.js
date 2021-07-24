import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import templateReducer from "./reducers/template";
import formsReducer from "./reducers/forms";
import uploadImageReducer from "./reducers/uploadImage";
import isLoggedInReducers from "./reducers/isLoggedIn";

const reducer = combineReducers({
  forms: formsReducer,
  template: templateReducer,
  uploadImage: uploadImageReducer,
  isLoggedIn: isLoggedInReducers
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
