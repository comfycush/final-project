import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import templateReducer from "./reducers/template";
import formsReducer from "./reducers/forms";

const reducer = combineReducers({
  forms: formsReducer,
  template: templateReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
