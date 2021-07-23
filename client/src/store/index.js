import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import templateReducer from "./reducers/template";

const reducer = combineReducers({
  template: templateReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
