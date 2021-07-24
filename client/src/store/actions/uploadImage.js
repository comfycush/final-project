import {
  SET_LOGO_URL,
  SET_MAIN_IMAGE_URL,
  SET_ABOUT_IMAGE_URL,
  SET_CARD_IMAGE_1_URL,
  SET_CARD_IMAGE_2_URL,
  SET_CARD_IMAGE_3_URL,
  SET_EMAIL_ICON_URL,
  SET_PHONE_ICON_URL,
  SET_ADDRESS_ICON_URL,
} from "../actionTypes";

import axios from "axios";

export function setLogoUrl(input) {
  return {
    type: SET_LOGO_URL,
    payload: input,
  };
}

export function setMainImageUrl(input) {
  return {
    type: SET_MAIN_IMAGE_URL,
    payload: input,
  };
}

export function setAboutImageUrl(input) {
  return {
    type: SET_ABOUT_IMAGE_URL,
    payload: input,
  };
}

export function setCardImage1Url(input) {
  return {
    type: SET_CARD_IMAGE_1_URL,
    payload: input,
  };
}

export function setCardImage2Url(input) {
  return {
    type: SET_CARD_IMAGE_2_URL,
    payload: input,
  };
}

export function setCardImage3Url(input) {
  return {
    type: SET_CARD_IMAGE_3_URL,
    payload: input,
  };
}

export function setEmailIconUrl(input) {
  return {
    type: SET_EMAIL_ICON_URL,
    payload: input,
  };
}

export function setPhoneIconUrl(input) {
  return {
    type: SET_PHONE_ICON_URL,
    payload: input,
  };
}

export function setAddressIconUrl(input) {
  return {
    type: SET_ADDRESS_ICON_URL,
    payload: input,
  };
}

export function getImageUrl(file, code) {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      // dispatch(setLoading(true));
      const response = await axios({
        url: "https://api.cloudinary.com/v1_1/du39lpkuj/upload",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: formData,
      });
      const result = await response;
      const imageUrl = result.data.secure_url;
      console.log(imageUrl, "<<<< imageUrl");
      switch (code) {
        case "logo":
          dispatch(setLogoUrl(imageUrl));
          break;
        case "about":
          dispatch(setAboutImageUrl(imageUrl));
          break;
        case "main":
          dispatch(setMainImageUrl(imageUrl));
          break;
        case "card1":
          dispatch(setCardImage1Url(imageUrl));
          break;
        case "card2":
          dispatch(setCardImage2Url(imageUrl));
          break;
        case "card3":
          dispatch(setCardImage3Url(imageUrl));
          break;
        case "email":
          dispatch(setEmailIconUrl(imageUrl));
          break;
        case "phone":
          dispatch(setPhoneIconUrl(imageUrl));
          break;
        case "address":
          dispatch(setAddressIconUrl(imageUrl));
          break;
        default:
          return null;
      }
      // dispatch(setLoading(false));
    } catch (err) {
      console.log(err, "<< errorrr");
      // dispatch(setError(true));
    }
  };
}
