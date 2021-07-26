import React, { useState } from "react";
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

function NavbarSection(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
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

  const [type, setType] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
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
      navlinksColor,
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
    dispatch(generateColorArray());
  }

  return (
    <section id="navbar-section">
      <h1>Navbar Section</h1>
      <h3>1 of 6</h3>
      <div style={{ display: "flex" }}>
        <div className="input">
          <label htmlFor="company-title" className="company-title">
            Company Name
          </label>
          <input
            onChange={(event) => setCompanyName(event.target.value)}
            type="text"
            name="company-title"
            className="company-title"
          />
          <label
            style={{ marginLeft: "1.5rem" }}
            htmlFor="company-title-color"
            className="company-title-color"
          >
            Color
          </label>
          <input
            onChange={(event) => setCompanyNameColor(event.target.value)}
            type="color"
            name="company-title-color"
            id="company-title-color"
          />
          <br />
          <br />
          <label htmlFor="company-logo" className="company-logo">
            Your Company Logo
          </label>
          <input
            onChange={(event) => uploadLogo(event.target.files[0], "logo")}
            type="file"
            name="company-logo"
            className="company-logo"
          />
          {logoUrl && (
            <img
              src={logoUrl}
              alt=""
              style={{ width: "5rem", height: "5rem" }}
            />
          )}
          <button onClick={() => dispatch(setLogoUrl(""))}>Remove Image</button>
          <br />
          <br />
          <label htmlFor="links-navbar">Links</label>
          <input
            type="checkbox"
            onClick={(event) =>
              addNavlink(event.target.checked, event.target.value)
            }
            name="about"
            id="about"
            style={{ marginLeft: "1.5rem" }}
            defaultValue="About"
          />
          <label htmlFor="about">About</label>
          <input
            type="checkbox"
            onClick={(event) =>
              addNavlink(event.target.checked, event.target.value)
            }
            name="service"
            id="service"
            defaultValue="Service"
          />
          <label htmlFor="service">Service</label>
          <input
            type="checkbox"
            onClick={(event) =>
              addNavlink(event.target.checked, event.target.value)
            }
            name="contact"
            id="contact"
            defaultValue="Contact"
          />
          <label htmlFor="contact">Contact</label>
          <br />
          <br />
          <label htmlFor="color-navbar">Color</label>
          <input
            onChange={(event) => setNavlinksColor(event.target.value)}
            type="color"
            name="navlink-color"
            id="navlink-color"
          />
          <br />
          <br />
          <label htmlFor="background-color-navbar">Background Color</label>
          <input
            onChange={(event) => setBackgroundColor(event.target.value)}
            type="color"
            name="background-color-navbar"
            id="background-color-navbar"
          />
          <br />
          <br />
          <div className="selection-navbar">
            <label htmlFor="template-layout">Template Layout</label>
            <br />
            <br />
            <div className="selection-navbar">
              <input
                onClick={(event) => setType(event.target.value)}
                type="radio"
                name="opt-navbar"
                id="opt1-navbar"
                defaultValue="1"
              />
              <img className="selection-img" src={navbar1} alt="image1" />
              <input
                onClick={(event) => setType(event.target.value)}
                type="radio"
                name="opt-navbar"
                id="opt2-navbar"
                defaultValue="2"
              />
              <img className="selection-img" src={navbar2} alt="image2" />
              <input
                onClick={(event) => setType(event.target.value)}
                type="radio"
                name="opt-navbar"
                id="opt3-navbar"
                defaultValue="3"
              />
              <img className="selection-img" src={navbar3} alt="image3" />
            </div>
            <br />
            <br />
            <button onClick={addNavbarSection} className="button-navbar">
              next
            </button>
          </div>
        </div>

        <div style={{ marginTop: 100, position: 'fixed', marginLeft: 1000, textAlign:'center'}}>
          <Color />
          <label
            style={{ marginRight: 20 }}
            htmlFor="generate-color"
            className="generate-color-label"
          >
            Generate Color Palatte
          </label>
          <button
            onClick={generateColor}
            style={{
              marginLeft: 20,
              width: 80,
              height: 30,
              backgroundColor: "#BB5E53",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Refresh
          </button>
        </div>
        {showModal && (
          <ModalImage
            image={modalImage}
            height={modalHeight}
            width={modalWidth}
          ></ModalImage>
        )}
      </div>
    </section>
  );
}

export default NavbarSection;
