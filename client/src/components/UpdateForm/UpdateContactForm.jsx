import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
import contact1 from "../../assets/contact1.png";
import contact2 from "../../assets/contact2.png";
import contact3 from "../../assets/contact3.png";
import ModalImage from "../ModalImage";
import Color from "../Color";
import { generateColorArray } from "../../store/actions/template";

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

  const uploadLoading = useSelector((state) => state.uploadImage.uploadLoading);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalHeight, setModalHeight] = useState("");
  const [modalWidth, setModalWidth] = useState("");

  function viewImage(image, height, width) {
    setShowModal(true);
    setModalImage(image);
    setModalHeight(height);
    setModalWidth(width);
  }

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
      new Swal("Please fill the headline", "", "error");
    } else if (
      !dataContactSection.email &&
      !dataContactSection.phone &&
      !dataContactSection.address
    ) {
      new Swal("Please fill at least 1 contact information", "", "error");
    } else if (!dataContactSection.type) {
      new Swal("Please choose the template layout", "", "error");
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
      dispatch(updateTemplate(allData.id, updatedTemplate)).then(() => {
        if (allData.isDeploy) {
          history.push(`/deploy/${allData.navbar.companyName}/${allData.id}`);
        } else {
          history.push({
            pathname: `/finish/${allData.id}`,
            state: {
              templateId: allData.id,
            },
          });
        }
      });
    }
  }

  function removeContactSection() {
    const dataContactSection = {
      type: null,
      headline: null,
      headlineColor: "#000000",
      backgroundColor: "#FFFFFF",
      emailIcon: null,
      email: null,
      emailColor: "#000000",
      phoneIcon: null,
      phone: null,
      phoneColor: "#000000",
      addressIcon: null,
      address: null,
      addressColor: "#000000",
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
    dispatch(updateTemplate(allData.id, updatedTemplate)).then(() => {
      if (allData.isDeploy) {
        history.push(`/deploy/${allData.navbar.companyName}/${allData.id}`);
      } else {
        history.push({
          pathname: `/finish/${allData.id}`,
          state: {
            templateId: allData.id,
          },
        });
      }
    });
  }

  function uploadContactIcon(file, code) {
    dispatch(getImageUrl(file, code));
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (localStorage.colorArray) {
      window.onscroll = () => {
        stickyColor();
      };

      const colorPalette = document.getElementById("sticky-colormind");
      const stickyOffset = colorPalette.offsetTop;

      function stickyColor() {
        if (window.pageYOffset >= stickyOffset) {
          colorPalette.classList.add("sticky");
        } else {
          colorPalette.classList.remove("sticky");
        }
      }
    }
  }, [window.pageYOffset]);

  function generateColor() {
    dispatch(generateColorArray());
  }

  return (
    <section id="contact-section">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "3rem",
        }}
      >
        <div className="input">
          <h2 className="title-subform">Headline</h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label htmlFor="contact-headline" className="contact-headline">
                Text
              </label>
              <input
                onChange={(event) => setHeadline(event.target.value)}
                type="text"
                name="contact-headline"
                className="contact-headline"
                style={{ marginBottom: "1rem" }}
                value={headline}
              />
              <label htmlFor="contact-headline" className="contact-headline">
                Color
              </label>
              <div className="input-color-side">
                <input
                  onChange={(event) => setHeadlineColor(event.target.value)}
                  type="color"
                  name="contact-headline"
                  className="contact-headline mt-half"
                  value={headlineColor}
                />
                <p className="color-info-tag">{headlineColor}</p>
              </div>
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem " }}>
            Email
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label htmlFor="contact-email" className="contact-email">
                Text
              </label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                name="contact-email"
                className="contact-email"
                style={{ marginBottom: "1rem" }}
                value={email}
              />
              <label htmlFor="contact-email" className="contact-email">
                Color
              </label>
              <div className="input-color-side mb-1 mt-half">
                <input
                  onChange={(event) => setEmailColor(event.target.value)}
                  type="color"
                  name="contact-email"
                  className="contact-email"
                  value={emailColor}
                />
                <p className="color-info-tag">{emailColor}</p>
              </div>
            </div>
            <div className="form-align-center">
              <label
                htmlFor="contact-email"
                className="contact-email"
                style={{ marginBottom: "1rem" }}
              >
                Icon
              </label>
              <input
                id="email-icon-update"
                onChange={(event) =>
                  uploadContactIcon(event.target.files[0], "email")
                }
                type="file"
                name="contact-email"
                className="contact-email"
              />
              {uploadLoading ? (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/Rolling-1s-200px__1__O7q4jtvrH.gif?updatedAt=1627456298380"
                  alt="loading"
                  style={{ width: "5rem", height: "5rem" }}
                />
              ) : (
                emailIconUrl && (
                  <img
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    src={emailIconUrl}
                    alt="email"
                  />
                )
              )}
              <button
                className="btn btn-remove-image"
                onClick={() => {
                  dispatch(setEmailIconUrl(""));
                  document.getElementById("email-icon-update").value = "";
                }}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Phone
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label htmlFor="contact-phone" className="contact-phone">
                Text
              </label>
              <input
                onChange={(event) => setPhone(event.target.value)}
                type="text"
                name="contact-phone"
                className="contact-phone"
                value={phone}
              />
              <label
                htmlFor="contact-phone"
                className="contact-phone"
                style={{ marginTop: "1rem" }}
              >
                Color
              </label>
              <div className="input-color-side mt-half mb-1">
                <input
                  onChange={(event) => setPhoneColor(event.target.value)}
                  type="color"
                  name="contact-phone"
                  className="contact-phone"
                  value={phoneColor}
                />
                <p className="color-info-tag">{phoneColor}</p>
              </div>
            </div>
            <div className="form-align-center">
              <label
                htmlFor="contact-phone"
                className="contact-phone"
                style={{ marginBottom: "1rem" }}
              >
                Icon
              </label>
              <input
                id="phone-icon-update"
                onChange={(event) =>
                  uploadContactIcon(event.target.files[0], "phone")
                }
                type="file"
                name="contact-phone"
                className="contact-phone"
              />
              {uploadLoading ? (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/Rolling-1s-200px__1__O7q4jtvrH.gif?updatedAt=1627456298380"
                  alt="loading"
                  style={{ width: "5rem", height: "5rem" }}
                />
              ) : (
                phoneIconUrl && (
                  <img
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    src={phoneIconUrl}
                    alt="phone"
                  />
                )
              )}
              <button
                className="btn btn-remove-image"
                onClick={() => {
                  dispatch(setPhoneIconUrl(""));
                  document.getElementById("phone-icon-update").value = "";
                }}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Address
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label htmlFor="contact-address" className="contact-address">
                Text
              </label>
              <input
                onChange={(event) => setAddress(event.target.value)}
                type="text"
                name="contact-address"
                className="contact-address"
                value={address}
              />
              <label htmlFor="contact-address" className="contact-address mt-1">
                Color
              </label>
              <div className="input-color-side mt-half mb-1">
                <input
                  onChange={(event) => setAddressColor(event.target.value)}
                  type="color"
                  name="contact-address"
                  className="contact-address"
                  value={addressColor}
                />
                <p className="color-info-tag">{addressColor}</p>
              </div>
            </div>
            <div className="form-align-center">
              <label htmlFor="contact-address" className="contact-address mb-1">
                Icon
              </label>
              <input
                id="address-icon-update"
                onChange={(event) =>
                  uploadContactIcon(event.target.files[0], "address")
                }
                type="file"
                name="contact-address"
                className="contact-address"
              />
              {uploadLoading ? (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/Rolling-1s-200px__1__O7q4jtvrH.gif?updatedAt=1627456298380"
                  alt="loading"
                  style={{ width: "5rem", height: "5rem" }}
                />
              ) : (
                addressIconUrl && (
                  <img
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    src={addressIconUrl}
                    alt="address"
                  />
                )
              )}
              <button
                className="btn btn-remove-image"
                onClick={() => {
                  dispatch(setAddressIconUrl(""));
                  document.getElementById("address-icon-update").value = "";
                }}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
          </div>
          <div className="form-align-center">
            <label
              htmlFor="background-color-contact"
              style={{ fontSize: "2rem" }}
              className="mt-2 mb-1"
            >
              Background Color
            </label>
            <div className="input-color-side mb-2">
              <input
                onChange={(event) => setBackgroundColor(event.target.value)}
                type="color"
                name="background-color-contact"
                id="background-color-contact"
                value={backgroundColor}
              />
              <p className="color-info-tag">{backgroundColor}</p>
            </div>
          </div>
          <label htmlFor="template-layout" style={{ fontSize: "2rem" }}>
            Template Layout
          </label>
          <div className="selection-contact mt-2">
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="1"
                type="radio"
                name="opt-navbar"
                id="opt1-navbar"
                defaultChecked={type === 1 ? true : false}
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(contact1, "28", "80")}
              >
                <img
                  className="selection-img"
                  src={contact1}
                  alt="image1"
                  onClick={() => viewImage(contact1, "28", "80")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="2"
                type="radio"
                name="opt-navbar"
                id="opt2-navbar"
                defaultChecked={type === 2 ? true : false}
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(contact2, "30", "80")}
              >
                <img
                  className="selection-img"
                  src={contact2}
                  alt="image2"
                  onClick={() => viewImage(contact2, "30", "80")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="3"
                type="radio"
                name="opt-navbar"
                id="opt3-navbar"
                defaultChecked={type === 3 ? true : false}
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(contact3, "40", "31")}
              >
                <img
                  className="selection-img"
                  src={contact3}
                  alt="image3"
                  onClick={() => viewImage(contact3, "40", "31")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {localStorage.colorArray && (
          <div className="colormind-component">
            <div id="sticky-colormind">
              <label htmlFor="generate-color" className="generate-color-label">
                Generate Color Palette
              </label>
              <Color />
              <button className="btn btn-refresh-color" onClick={generateColor}>
                Refresh
              </button>
            </div>
          </div>
        )}
        {showModal && (
          <ModalImage
            image={modalImage}
            height={modalHeight}
            width={modalWidth}
            setShowModal={setShowModal}
          ></ModalImage>
        )}
      </div>
      <div className="button-service btn-form-page">
        <button className="btn btn-remove" onClick={removeContactSection}>
          Remove Section
        </button>
        <button className="btn btn-update" onClick={updateContactSection}>
          Update Section
        </button>
      </div>
    </section>
    // <section id="contact-section">
    //   <div className="input">
    //     <label htmlFor="generate-color" className="generate-color-label">
    //       Generate Color Palette
    //     </label>
    //     <input type="color" name="generate-color" className="generate-color" />
    //     <button>Refresh</button>
    //     <br />
    //     <br />
    //     <label htmlFor="contact-headline" className="contact-headline">
    //       Headline
    //     </label>
    //     <input
    //       onChange={(event) => setHeadline(event.target.value)}
    //       type="text"
    //       name="contact-headline"
    //       className="contact-headline"
    //       value={headline}
    //     />
    //     <label htmlFor="contact-headline" className="contact-headline">
    //       Color
    //     </label>
    //     <input
    //       onChange={(event) => setHeadlineColor(event.target.value)}
    //       type="color"
    //       name="contact-headline"
    //       className="contact-headline"
    //       value={headlineColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="contact-email" className="contact-email">
    //       Email
    //     </label>
    //     <input
    //       onChange={(event) => setEmail(event.target.value)}
    //       type="text"
    //       name="contact-email"
    //       className="contact-email"
    //       value={email}
    //     />
    //     <label htmlFor="contact-email" className="contact-email">
    //       Color
    //     </label>
    //     <input
    //       onChange={(event) => setEmailColor(event.target.value)}
    //       type="color"
    //       name="contact-email"
    //       className="contact-email"
    //       value={emailColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="contact-email" className="contact-email">
    //       Email Icon
    //     </label>
    //     <input
    //       onChange={(event) =>
    //         uploadContactIcon(event.target.files[0], "email")
    //       }
    //       type="file"
    //       name="contact-email"
    //       className="contact-email"
    //     />
    //     {emailIconUrl && (
    //       <img
    //         style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
    //         src={emailIconUrl}
    //         alt="email"
    //       />
    //     )}
    //     <button onClick={() => dispatch(setEmailIconUrl(""))}>
    //       Remove Image
    //     </button>
    //     <br />
    //     <br />
    //     <label htmlFor="contact-phone" className="contact-phone">
    //       Phone
    //     </label>
    //     <input
    //       onChange={(event) => setPhone(event.target.value)}
    //       type="text"
    //       name="contact-phone"
    //       className="contact-phone"
    //       value={phone}
    //     />
    //     <label htmlFor="contact-phone" className="contact-phone">
    //       Color
    //     </label>
    //     <input
    //       onChange={(event) => setPhoneColor(event.target.value)}
    //       type="color"
    //       name="contact-phone"
    //       className="contact-phone"
    //       value={phoneColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="contact-phone" className="contact-phone">
    //       Phone Icon
    //     </label>
    //     <input
    //       onChange={(event) =>
    //         uploadContactIcon(event.target.files[0], "phone")
    //       }
    //       type="file"
    //       name="contact-phone"
    //       className="contact-phone"
    //     />
    //     {phoneIconUrl && (
    //       <img
    //         style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
    //         src={phoneIconUrl}
    //         alt="phone"
    //       />
    //     )}
    //     <button onClick={() => dispatch(setPhoneIconUrl(""))}>
    //       Remove Image
    //     </button>
    //     <br />
    //     <br />
    //     <label htmlFor="contact-address" className="contact-address">
    //       Address
    //     </label>
    //     <input
    //       onChange={(event) => setAddress(event.target.value)}
    //       type="text"
    //       name="contact-address"
    //       className="contact-address"
    //       value={address}
    //     />
    //     <label htmlFor="contact-address" className="contact-address">
    //       Color
    //     </label>
    //     <input
    //       onChange={(event) => setAddressColor(event.target.value)}
    //       type="color"
    //       name="contact-address"
    //       className="contact-address"
    //       value={addressColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="contact-address" className="contact-address">
    //       Address Icon
    //     </label>
    //     <input
    //       onChange={(event) =>
    //         uploadContactIcon(event.target.files[0], "address")
    //       }
    //       type="file"
    //       name="contact-address"
    //       className="contact-address"
    //     />
    //     {addressIconUrl && (
    //       <img
    //         style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
    //         src={addressIconUrl}
    //         alt="address"
    //       />
    //     )}
    //     <button onClick={() => dispatch(setAddressIconUrl(""))}>
    //       Remove Image
    //     </button>
    //     <br />
    //     <br />
    //     <label htmlFor="background-color-contact">Background Color</label>
    //     <input
    //       onChange={(event) => setBackgroundColor(event.target.value)}
    //       type="color"
    //       name="background-color-contact"
    //       id="background-color-contact"
    //       value={backgroundColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="template-layout">Template Layout</label>
    //     <br />
    //     <br />
    //     <div className="selection-contact">
    //       <input
    //         onClick={(event) => setType(event.target.value)}
    //         defaultValue="1"
    //         type="radio"
    //         name="opt-navbar"
    //         id="opt1-navbar"
    //         defaultChecked={type === 1 ? true : false}
    //       />
    //       <img
    //         className="selection-img"
    //         src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
    //         alt="image1"
    //       />
    //       <input
    //         onClick={(event) => setType(event.target.value)}
    //         defaultValue="2"
    //         type="radio"
    //         name="opt-navbar"
    //         id="opt2-navbar"
    //         defaultChecked={type === 2 ? true : false}
    //       />
    //       <img
    //         className="selection-img"
    //         src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
    //         alt="image2"
    //       />
    //       <input
    //         onClick={(event) => setType(event.target.value)}
    //         defaultValue="3"
    //         type="radio"
    //         name="opt-navbar"
    //         id="opt3-navbar"
    //         defaultChecked={type === 3 ? true : false}
    //       />
    //       <img
    //         className="selection-img"
    //         src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
    //         alt="image3"
    //       />
    //     </div>
    //     <div className="button-contact">
    //       <button onClick={removeContactSection}>Remove Section</button>
    //       <button onClick={updateContactSection}>Update Section</button>
    //     </div>
    //   </div>
    // </section>
  );
}
