import { 
    SET_TO_NAVBAR,
    SET_TO_MAIN_SECTION,
    SET_TO_ABOUT_SECTION,
    SET_TO_SERVICE_SECTION,
    SET_TO_CONTACT_SECTION,
    SET_TO_FOOTER_SECTION
} from "../actionTypes";

export function setToNavbar(input) {
    return {
        type: SET_TO_NAVBAR,
        payload: input,
  };
}

export function setToMainSection(input) {
    return {
        type: SET_TO_MAIN_SECTION,
        payload: input,
  };
}

export function setToAboutSection(input) {
    return {
        type: SET_TO_ABOUT_SECTION,
        payload: input,
  };
}

export function setToServiceSection(input) {
    return {
        type: SET_TO_SERVICE_SECTION,
        payload: input,
  };
}

export function setToContactSection(input) {
    return {
        type: SET_TO_CONTACT_SECTION,
        payload: input,
  };
}

export function setToFooterSection(input) {
    return {
        type: SET_TO_FOOTER_SECTION,
        payload: input,
  };
}
