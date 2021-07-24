import {
  SET_PROJECT_TITLE,
  SET_NAVBAR_SECTION,
  SET_MAIN_SECTION,
  SET_ABOUT_SECTION,
  SET_SERVICE_SECTION,
  SET_CONTACT_SECTION,
  SET_FOOTER_SECTION,
} from "../actionTypes";

export function setProjectTitle(input) {
  return {
    type: SET_PROJECT_TITLE,
    payload: input,
  };
}

export function setNavbarSection(input) {
  return {
    type: SET_NAVBAR_SECTION,
    payload: input,
  };
}

export function setMainSection(input) {
  return {
    type: SET_MAIN_SECTION,
    payload: input,
  };
}

export function setAboutSection(input) {
  return {
    type: SET_ABOUT_SECTION,
    payload: input,
  };
}

export function setServiceSection(input) {
  return {
    type: SET_SERVICE_SECTION,
    payload: input,
  };
}

export function setContactSection(input) {
  return {
    type: SET_CONTACT_SECTION,
    payload: input,
  };
}

export function setFooterSection(input) {
  return {
    type: SET_FOOTER_SECTION,
    payload: input,
  };
}
