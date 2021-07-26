import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import "../../styles/contactSection.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setContactSection, updateTemplate } from "../../store/actions/forms";
import {
  getImageUrl,
  setEmailIconUrl,
  setPhoneIconUrl,
  setAddressIconUrl,
} from "../../store/actions/uploadImage";
import { useLocation } from "react-router";

export default function UpdateContactForm({ data, allData }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(data.type);
  const [headline, setHeadline] = useState(data.headline);
  const [headlineColor, setHeadlineColor] = useState(data.headlineColor);
  const [backgroundColor, setBackgroundColor] = useState(data.backgroundColor);

  // const [emailIcon, setEmailIcon] = useState('')
  const emailIconUrl = useSelector((state) => state.uploadImage.emailIconUrl);
  const [email, setEmail] = useState(data.email);
  const [emailColor, setEmailColor] = useState(data.emailColor);

  // const [phoneIcon, setPhoneIcon] = useState('')
  const phoneIconUrl = useSelector((state) => state.uploadImage.phoneIconUrl);
  const [phone, setPhone] = useState(data.phone);
  const [phoneColor, setPhoneColor] = useState(data.phoneColor);

  // const [addressIcon, setAddressIcon] = useState('')
  const addressIconUrl = useSelector(
    (state) => state.uploadImage.addressIconUrl
  );
  const [address, setAddress] = useState(data.address);
  const [addressColor, setAddressColor] = useState(data.addressColor);

  useEffect(() => {
    dispatch(setEmailIconUrl(data.emailIcon));
    dispatch(setPhoneIconUrl(data.phoneIcon));
    dispatch(setAddressIconUrl(data.addressIcon));
  }, []);

  function updateContactSection() {
    const dataContactSection = {
      type: +type,
      headline,
      headlineColor,
      backgroundColor,
      emailIcon: emailIconUrl,
      email,
      emailColor,
      phoneIcon: phoneIconUrl,
      phone,
      phoneColor,
      addressIcon: addressIconUrl,
      address,
      addressColor,
    };

    if (!dataContactSection.headline) {
      swal("Please fill your headline");
    } else if (
      !dataContactSection.email &&
      !dataContactSection.phone &&
      !dataContactSection.address
    ) {
      swal("Please fill your information minimum 1");
    } else if (!dataContactSection.type) {
      swal("Please choose your required template");
    } else {
      dispatch(setContactSection(dataContactSection));
      const updatedTemplate = {
        isDeploy: allData.isDeploy,
        projectTitle: allData.projectTitle,
        userId: allData.userId,
        navbar: allData.navbar,
        main: allData.main,
        about: allData.about,
        service: allData.service,
        contact: dataContactSection,
        footer: allData.footer,
      };
      dispatch(updateTemplate(allData.id, updatedTemplate));
      history.push({
        pathname: "/finish",
        state: {
          templateId: allData.id,
        },
      });
    }
  }

  function removeContactSection() {
    const dataContactSection = {
      type: null,
      headline: null,
      headlineColor: null,
      backgroundColor: null,
      emailIcon: null,
      email: null,
      emailColor: null,
      phoneIcon: null,
      phone: null,
      phoneColor: null,
      addressIcon: null,
      address: null,
      addressColor: null,
    };

    dispatch(setContactSection(dataContactSection));
    const updatedTemplate = {
      isDeploy: allData.isDeploy,
      projectTitle: allData.projectTitle,
      userId: allData.userId,
      navbar: allData.navbar,
      main: allData.main,
      about: allData.about,
      service: allData.service,
      contact: dataContactSection,
      footer: allData.footer,
    };
    dispatch(updateTemplate(allData.id, updatedTemplate));
    history.push({
      pathname: "/finish",
      state: {
        templateId: allData.id,
      },
    });
  }

  function uploadContactIcon(file, code) {
    dispatch(getImageUrl(file, code));
  }

  return (
    <section id="contact-section">
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">
          Generate Color Palette
        </label>
        <input type="color" name="generate-color" className="generate-color" />
        <button>Refresh</button>
        <br />
        <br />
        <label htmlFor="contact-headline" className="contact-headline">
          Headline
        </label>
        <input
          onChange={(event) => setHeadline(event.target.value)}
          type="text"
          name="contact-headline"
          className="contact-headline"
          value={headline}
        />
        <label htmlFor="contact-headline" className="contact-headline">
          Color
        </label>
        <input
          onChange={(event) => setHeadlineColor(event.target.value)}
          type="color"
          name="contact-headline"
          className="contact-headline"
          value={headlineColor}
        />
        <br />
        <br />
        <label htmlFor="contact-email" className="contact-email">
          Email
        </label>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          name="contact-email"
          className="contact-email"
          value={email}
        />
        <label htmlFor="contact-email" className="contact-email">
          Color
        </label>
        <input
          onChange={(event) => setEmailColor(event.target.value)}
          type="color"
          name="contact-email"
          className="contact-email"
          value={emailColor}
        />
        <br />
        <br />
        <label htmlFor="contact-email" className="contact-email">
          Email Icon
        </label>
        <input
          onChange={(event) =>
            uploadContactIcon(event.target.files[0], "email")
          }
          type="file"
          name="contact-email"
          className="contact-email"
        />
        {emailIconUrl && (
          <img
            style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
            src={emailIconUrl}
            alt="email"
          />
        )}
        <button onClick={() => dispatch(setEmailIconUrl(""))}>
          Remove Image
        </button>
        <br />
        <br />
        <label htmlFor="contact-phone" className="contact-phone">
          Phone
        </label>
        <input
          onChange={(event) => setPhone(event.target.value)}
          type="text"
          name="contact-phone"
          className="contact-phone"
          value={phone}
        />
        <label htmlFor="contact-phone" className="contact-phone">
          Color
        </label>
        <input
          onChange={(event) => setPhoneColor(event.target.value)}
          type="color"
          name="contact-phone"
          className="contact-phone"
          value={phoneColor}
        />
        <br />
        <br />
        <label htmlFor="contact-phone" className="contact-phone">
          Phone Icon
        </label>
        <input
          onChange={(event) =>
            uploadContactIcon(event.target.files[0], "phone")
          }
          type="file"
          name="contact-phone"
          className="contact-phone"
        />
        {phoneIconUrl && (
          <img
            style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
            src={phoneIconUrl}
            alt="phone"
          />
        )}
        <button onClick={() => dispatch(setPhoneIconUrl(""))}>
          Remove Image
        </button>
        <br />
        <br />
        <label htmlFor="contact-address" className="contact-address">
          Address
        </label>
        <input
          onChange={(event) => setAddress(event.target.value)}
          type="text"
          name="contact-address"
          className="contact-address"
          value={address}
        />
        <label htmlFor="contact-address" className="contact-address">
          Color
        </label>
        <input
          onChange={(event) => setAddressColor(event.target.value)}
          type="color"
          name="contact-address"
          className="contact-address"
          value={addressColor}
        />
        <br />
        <br />
        <label htmlFor="contact-address" className="contact-address">
          Address Icon
        </label>
        <input
          onChange={(event) =>
            uploadContactIcon(event.target.files[0], "address")
          }
          type="file"
          name="contact-address"
          className="contact-address"
        />
        {addressIconUrl && (
          <img
            style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
            src={addressIconUrl}
            alt="address"
          />
        )}
        <button onClick={() => dispatch(setAddressIconUrl(""))}>
          Remove Image
        </button>
        <br />
        <br />
        <label htmlFor="background-color-contact">Background Color</label>
        <input
          onChange={(event) => setBackgroundColor(event.target.value)}
          type="color"
          name="background-color-contact"
          id="background-color-contact"
          value={backgroundColor}
        />
        <br />
        <br />
        <label htmlFor="template-layout">Template Layout</label>
        <br />
        <br />
        <div className="selection-contact">
          <input
            onClick={(event) => setType(event.target.value)}
            defaultValue="1"
            type="radio"
            name="opt-navbar"
            id="opt1-navbar"
            defaultChecked={type === 1 ? true : false}
          />
          <img
            className="selection-img"
            src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
            alt="image1"
          />
          <input
            onClick={(event) => setType(event.target.value)}
            defaultValue="2"
            type="radio"
            name="opt-navbar"
            id="opt2-navbar"
            defaultChecked={type === 2 ? true : false}
          />
          <img
            className="selection-img"
            src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
            alt="image2"
          />
          <input
            onClick={(event) => setType(event.target.value)}
            defaultValue="3"
            type="radio"
            name="opt-navbar"
            id="opt3-navbar"
            defaultChecked={type === 3 ? true : false}
          />
          <img
            className="selection-img"
            src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
            alt="image3"
          />
        </div>
        <div className="button-contact">
          <button onClick={removeContactSection}>Remove Section</button>
          <button onClick={updateContactSection}>Update Section</button>
        </div>
      </div>
    </section>
  );
}
