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

export function createTemplate(data) {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response;
      console.log(result, "<<< result");
    } catch (err) {
      console.log(err);
    }
  };
}

export function updateTemplate(id, data) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/template/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response;
      console.log(result, "<<< result");
    } catch (err) {
      console.log(err);
    }
  };
}
