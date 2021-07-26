import {
  SET_PROJECT_TITLE,
  SET_NAVBAR_SECTION,
  SET_MAIN_SECTION,
  SET_ABOUT_SECTION,
  SET_SERVICE_SECTION,
  SET_CONTACT_SECTION,
  SET_FOOTER_SECTION,
  SET_TEMPLATE_ID,
  SET_USER_ID,
  SET_IS_DEPLOY
} from "../actionTypes";

const initialState = {
  projectTitle: "",
  templateId: '',
  userId: '',
  isDeploy: false,
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
  } else if (action.type === SET_TEMPLATE_ID) {
    return { ...state, templateId: action.payload };
  } else if (action.type === SET_USER_ID) {
    return { ...state, userId: action.payload };
  } else if (action.type === SET_IS_DEPLOY) {
    return { ...state, isDeploy: action.payload };
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
