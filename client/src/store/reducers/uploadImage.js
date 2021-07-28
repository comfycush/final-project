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
  SET_UPLOAD_LOADING,
} from "../actionTypes";

const initialState = {
  logoUrl: "",
  mainImageUrl: "",
  aboutImageUrl: "",
  card1ImageUrl: "",
  card2ImageUrl: "",
  card3ImageUrl: "",
  emailIconUrl: "",
  phoneIconUrl: "",
  addressIconUrl: "",
  uploadLoading: false,
};

export default function uploadImageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGO_URL:
      return { ...state, logoUrl: action.payload };
    case SET_MAIN_IMAGE_URL:
      return { ...state, mainImageUrl: action.payload };
    case SET_ABOUT_IMAGE_URL:
      return { ...state, aboutImageUrl: action.payload };
    case SET_CARD_IMAGE_1_URL:
      return { ...state, card1ImageUrl: action.payload };
    case SET_CARD_IMAGE_2_URL:
      return { ...state, card2ImageUrl: action.payload };
    case SET_CARD_IMAGE_3_URL:
      return { ...state, card3ImageUrl: action.payload };
    case SET_EMAIL_ICON_URL:
      return { ...state, emailIconUrl: action.payload };
    case SET_PHONE_ICON_URL:
      return { ...state, phoneIconUrl: action.payload };
    case SET_ADDRESS_ICON_URL:
      return { ...state, addressIconUrl: action.payload };
    case SET_UPLOAD_LOADING:
      return { ...state, uploadLoading: action.payload };
    default:
      return state;
  }
}
