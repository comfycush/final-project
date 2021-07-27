import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import templateReducer from "./reducers/template";
import formsReducer from "./reducers/forms";
import uploadImageReducer from "./reducers/uploadImage";
import dashboardReducer from "./reducers/dashboard";
import navigationGuardReducer from "./reducers/navigationGuard";

const reducer = combineReducers({
  forms: formsReducer,
  template: templateReducer,
  uploadImage: uploadImageReducer,
  dashboard: dashboardReducer,
  navigation: navigationGuardReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
