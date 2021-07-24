import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import templateReducer from "./reducers/template";
import formsReducer from "./reducers/forms";
import uploadImageReducer from "./reducers/uploadImage";

const reducer = combineReducers({
  forms: formsReducer,
  template: templateReducer,
  uploadImage: uploadImageReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
