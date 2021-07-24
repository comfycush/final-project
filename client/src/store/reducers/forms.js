import {
  SET_PROJECT_TITLE,
  SET_NAVBAR_SECTION,
  SET_MAIN_SECTION,
  SET_ABOUT_SECTION,
  SET_SERVICE_SECTION,
  SET_CONTACT_SECTION,
  SET_FOOTER_SECTION,
} from "../actionTypes";

const initialState = {
  projectTitle: "",
  navbar: {},
  main: {},
  about: {},
  service: {},
  contact: {},
  footer: {},
};

export default function formsReduces(state = initialState, action) {
  if (action.type === SET_PROJECT_TITLE) {
    return { ...state, projectTitle: action.payload };
  } else if (action.type === SET_NAVBAR_SECTION) {
    return { ...state, navbar: action.payload };
  } else if (action.type === SET_MAIN_SECTION) {
    return { ...state, main: action.payload };
  } else if (action.type === SET_ABOUT_SECTION) {
    return { ...state, about: action.payload };
  } else if (action.type === SET_SERVICE_SECTION) {
    return { ...state, service: action.payload };
  } else if (action.type === SET_CONTACT_SECTION) {
    return { ...state, contact: action.payload };
  } else if (action.type === SET_FOOTER_SECTION) {
    return { ...state, footer: action.payload };
  }
  return state;
}
