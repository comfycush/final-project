import {
   SET_TO_NAVBAR,
   SET_TO_MAIN_SECTION,
   SET_TO_ABOUT_SECTION,
   SET_TO_SERVICE_SECTION,
   SET_TO_CONTACT_SECTION,
   SET_TO_FOOTER_SECTION
  } from "../actionTypes";
  
  const initialState = {
    toNavbar: false,
    toMainSection: false,
    toAboutSection: false,
    toServiceSection: false,
    toContactSection: false,
    toFooterSection: false,
  };
  
  export default function navigationGuardReducer(state = initialState, action) {
    if (action.type === SET_TO_NAVBAR) {
        return { ...state, toNavbar: action.payload };
    } else if (action.type === SET_TO_MAIN_SECTION) {
        return { ...state, toMainSection: action.payload };
    } else if (action.type === SET_TO_ABOUT_SECTION) {
        return { ...state, toAboutSection: action.payload };
    } else if (action.type === SET_TO_SERVICE_SECTION) {
        return { ...state, toServiceSection: action.payload };
    } else if (action.type === SET_TO_CONTACT_SECTION) {
        return { ...state, toContactSection: action.payload };
    } else if (action.type === SET_TO_FOOTER_SECTION) {
        return { ...state, toFooterSection: action.payload };
    } 
    return state;
  }
  