import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setNavbarSection, updateTemplate } from "../store/actions/forms";
import swal from "sweetalert";
import { getImageUrl, setLogoUrl } from "../store/actions/uploadImage";
import "../styles/navbarSection.css";
import Color from "../components/Color";
import { generateColorArray } from "../store/actions/template";
import { useLocation } from "react-router";
import navbar1 from "../assets/navbar1.png";
import navbar2 from "../assets/navbar2.png";
import navbar3 from "../assets/navbar3.png";
import ModalImage from "../components/ModalImage";
import { setToMainSection } from "../store/actions/navigationGuard";

function NavbarSection(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalHeight, setModalHeight] = useState("");
  const [modalWidth, setModalWidth] = useState("");

  useEffect(() => {
    dispatch(setLogoUrl(""));
  }, []);

  function viewImage(image, height, width) {
    setShowModal(true);
    setModalImage(image);
    setModalHeight(height);
    setModalWidth(width);
  }

  const [type, setType] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [companyName, setCompanyName] = useState("");
  const [companyNameColor, setCompanyNameColor] = useState("#000000");
  const [navlinks, setNavlinks] = useState([]);
  const [navlinksColor, setNavlinksColor] = useState("#000000");
  const logoUrl = useSelector((state) => state.uploadImage.logoUrl);

  const stateIntro = location.state;
  // console.log(stateIntro, "<<<< stateIntro");
  const navbar = useSelector((state) => state.forms.navbar);
  const templateId = useSelector((state) => state.forms.templateId);

  function addNavlink(status, input) {
    if (status) {
      setNavlinks([...navlinks, input]);
    } else {
      const currentNavlinks = navlinks.filter((navlink) => navlink !== input);
      setNavlinks(currentNavlinks);
    }
  }

  function addNavbarSection(event) {
    let sortNavlinks = [];
    const aboutValue = navlinks.filter((link) => link === "About")[0];
    const serviceValue = navlinks.filter((link) => link === "Service")[0];
    const contactValue = navlinks.filter((link) => link === "Contact")[0];
    if (aboutValue) {
      sortNavlinks.push(aboutValue);
    }
    if (serviceValue) {
      sortNavlinks.push(serviceValue);
    }
    if (contactValue) {
      sortNavlinks.push(contactValue);
    }

    event.preventDefault();
    const dataNavbarSection = {
      type: +type,
      logo: logoUrl,
      backgroundColor,
      companyName,
      companyNameColor,
      navLinks: sortNavlinks,
      navLinksColor: navlinksColor,
    };

    if (!dataNavbarSection.companyName && !dataNavbarSection.logo) {
      swal("Please fill in your company name or company logo");
    } else if (sortNavlinks.length === 0) {
      swal("Please choose minimum 1 link");
    } else if (!dataNavbarSection.type) {
      swal("please choose your required template");
    } else {
      dispatch(setNavbarSection(dataNavbarSection));
      const newestTemplate = {
        ...stateIntro,
        navbar: dataNavbarSection,
        main: {},
        about: {},
        service: {},
        contact: {},
        footer: {},
      };
      dispatch(updateTemplate(templateId, newestTemplate));
      dispatch(setToMainSection(true))
      console.log(templateId, newestTemplate, "<<< update");
      history.push({
        pathname: "/main-section",
        state: {
          ...stateIntro,
          navbar: dataNavbarSection,
        },
      });
    }
  }

  function uploadLogo(file, code) {
    dispatch(getImageUrl(file, code));
  }

  function generateColor() {
    console.log(" mau manggil generate clor");
    dispatch(generateColorArray());
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
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
  }, [window.pageYOffset]);

  return (
    <section id="navbar-section">
      <h1>Navbar Section</h1>
      <h3>1 of 6</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "3rem",
        }}
      >
        <div className="input">
          <h2 className="title-subform">Company</h2>
          <div className="form-center contain-input">
            <div className="form-align-center">
              <label
                htmlFor="company-title"
                className="company-title"
                style={{ marginBottom: "0.5rem" }}
              >
                Name
              </label>
              <input
                onChange={(event) => setCompanyName(event.target.value)}
                type="text"
                name="company-title"
                className="company-title"
              />
            </div>
            <div className="form-align-center">
              <label
                htmlFor="company-title-color"
                className="company-title-color"
                style={{ marginBottom: "0.5rem" }}
              >
                Color
              </label>
              <input
                onChange={(event) => setCompanyNameColor(event.target.value)}
                type="color"
                name="company-title-color"
                id="company-title-color"
                style={{ border: "none", margin: "0rem" }}
              />
            </div>
            <div className="form-align-center">
              <label
                htmlFor="company-logo"
                className="company-logo"
                style={{ marginBottom: "1rem" }}
              >
                Logo
              </label>
              <input
                onChange={(event) => uploadLogo(event.target.files[0], "logo")}
                type="file"
                name="company-logo"
                className="company-logo"
                style={{ border: "none" }}
              />
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt=""
                  style={{ width: "5rem", height: "5rem" }}
                />
              )}
              <button
                className="btn btn-remove-image"
                onClick={() => dispatch(setLogoUrl(""))}
                style={{ margin: "0rem" }}
              >
                Remove Image
              </button>
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Navigation Links
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label htmlFor="links-navbar">Links</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.3rem",
                }}
              >
                <input
                  type="checkbox"
                  onClick={(event) =>
                    addNavlink(event.target.checked, event.target.value)
                  }
                  name="about"
                  id="about"
                  style={{
                    width: "3rem",
                  }}
                  defaultValue="About"
                />
                <label htmlFor="about" style={{ fontWeight: "normal" }}>
                  About
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.3rem",
                }}
              >
                <input
                  type="checkbox"
                  onClick={(event) =>
                    addNavlink(event.target.checked, event.target.value)
                  }
                  name="service"
                  id="service"
                  defaultValue="Service"
                  style={{ width: "3rem" }}
                />
                <label htmlFor="service" style={{ fontWeight: "normal" }}>
                  Service
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.3rem",
                }}
              >
                <input
                  type="checkbox"
                  onClick={(event) =>
                    addNavlink(event.target.checked, event.target.value)
                  }
                  name="contact"
                  id="contact"
                  defaultValue="Contact"
                  style={{ width: "3rem" }}
                />
                <label htmlFor="contact" style={{ fontWeight: "normal" }}>
                  Contact
                </label>
              </div>
            </div>
            <div className="form-align-center" style={{ marginTop: "1rem" }}>
              <label htmlFor="color-navbar" style={{ marginRight: "2.5rem" }}>
                Color
              </label>
              <input
                onChange={(event) => setNavlinksColor(event.target.value)}
                type="color"
                name="navlink-color"
                id="navlink-color"
                style={{ border: "none", marginTop: "0.5rem" }}
              />
            </div>
          </div>
          <div className="form-align-center mt-1">
            <label
              htmlFor="background-color-navbar"
              style={{
                marginRight: "3rem",
                fontSize: "2rem",
              }}
            >
              Background Color
            </label>
            <input
              onChange={(event) => setBackgroundColor(event.target.value)}
              type="color"
              name="background-color-navbar"
              id="background-color-navbar"
              value={backgroundColor}
              style={{ border: "none", marginTop: "1rem" }}
            />
          </div>
          <div className="selection-navbar">
            <label
              htmlFor="template-layout"
              style={{ fontSize: "2rem", margin: "1.5rem 0" }}
            >
              Template Layout
            </label>
            <div className="selection-navbar">
              <div className="horizontal-center">
                <input
                  onClick={(event) => setType(event.target.value)}
                  type="radio"
                  name="opt-navbar"
                  id="opt1-navbar"
                  defaultValue="1"
                  style={{ width: "1rem", marginRight: "1rem" }}
                />
                <div
                  className="container-img-hover"
                  onClick={() => viewImage(navbar1, "3", "80")}
                >
                  <img
                    className="selection-img"
                    src={navbar1}
                    alt="image1"
                    onClick={() => viewImage(navbar1, "3", "80")}
                  />
                  <div className="overlay">
                    <div className="text">Click To Enlarge The Picture</div>
                  </div>
                </div>
              </div>
              <div className="horizontal-center">
                <input
                  onClick={(event) => setType(event.target.value)}
                  type="radio"
                  name="opt-navbar"
                  id="opt2-navbar"
                  defaultValue="2"
                  style={{ width: "1rem", marginRight: "1rem" }}
                />
                <div
                  className="container-img-hover"
                  onClick={() => viewImage(navbar2, "3", "80")}
                >
                  <img
                    className="selection-img"
                    src={navbar2}
                    alt="image2"
                    onClick={() => viewImage(navbar2, "3", "80")}
                  />
                  <div className="overlay">
                    <div className="text">Click To Enlarge The Picture</div>
                  </div>
                </div>
              </div>
              <div className="horizontal-center">
                <input
                  onClick={(event) => setType(event.target.value)}
                  type="radio"
                  name="opt-navbar"
                  id="opt3-navbar"
                  defaultValue="3"
                  style={{ width: "1rem", marginRight: "1rem" }}
                />
                <div
                  className="container-img-hover"
                  onClick={() => viewImage(navbar3, "10", "80")}
                >
                  <img
                    className="selection-img"
                    src={navbar3}
                    alt="image3"
                    onClick={() => viewImage(navbar3, "10", "80")}
                  />
                  <div className="overlay">
                    <div className="text">Click To Enlarge The Picture</div>
                  </div>
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
      <div className="btn-form-page">
        <button className="btn btn-next" onClick={addNavbarSection}>
          Next
        </button>
      </div>
    </section>
  );
}

export default NavbarSection;
