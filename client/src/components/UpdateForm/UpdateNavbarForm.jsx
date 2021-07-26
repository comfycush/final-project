import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { setNavbarSection, updateTemplate } from "../../store/actions/forms";
import { getImageUrl, setLogoUrl } from "../../store/actions/uploadImage";
import { generateColorArray } from "../../store/actions/template";
import { useHistory } from "react-router-dom";
import navbar1 from "../../assets/navbar1.png";
import navbar2 from "../../assets/navbar2.png";
import navbar3 from "../../assets/navbar3.png";
import ModalImage from "../../components/ModalImage";
import Color from "../Color";

export default function UpdateNavbarForm({ data, allData }) {
  console.log(allData, "<< ALL DATA NAVBAR FORM");
  const dispatch = useDispatch();
  const history = useHistory();
  const [type, setType] = useState(data.type);
  const [backgroundColor, setBackgroundColor] = useState(data.backgroundColor);
  const [companyName, setCompanyName] = useState(data.companyName);
  const [companyNameColor, setCompanyNameColor] = useState(
    data.companyNameColor
  );
  const [navlinks, setNavlinks] = useState(data.navLinks);
  const [navlinksColor, setNavlinksColor] = useState(data.navLinksColor);
  const logoUrl = useSelector((state) => state.uploadImage.logoUrl);
  // const [logoUrl, setLO]

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalHeight, setModalHeight] = useState("");
  const [modalWidth, setModalWidth] = useState("");

  useEffect(() => {
    dispatch(setLogoUrl(data.logo));
  }, []);

  function addNavlink(status, input) {
    if (status) {
      setNavlinks([...navlinks, input]);
    } else {
      const currentNavlinks = navlinks.filter((navlink) => navlink !== input);
      setNavlinks(currentNavlinks);
    }
  }

  function updateNavbarSection(event) {
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
      const updatedTemplate = {
        isDeploy: allData.isDeploy,
        projectTitle: allData.projectTitle,
        userId: allData.userId,
        main: allData.main,
        about: allData.about,
        service: allData.service,
        contact: allData.contact,
        footer: allData.footer,
        navbar: dataNavbarSection,
      };
      dispatch(updateTemplate(allData.id, updatedTemplate));
      // console.log(templateId, updatedTemplate, "<<< update");
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
    }
    console.log(dataNavbarSection, "<<< data navbar");
  }

  function uploadLogo(file, code) {
    dispatch(getImageUrl(file, code));
  }

  function generateColor() {
    console.log(" mau manggil generate clor");
    dispatch(generateColorArray());
  }

  function viewImage(image, height, width) {
    setShowModal(true);
    setModalImage(image);
    setModalHeight(height);
    setModalWidth(width);
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
                value={companyName}
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
                value={companyNameColor}
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
                  defaultChecked={navlinks.includes("About") ? true : false}
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
                  defaultChecked={navlinks.includes("Service") ? true : false}
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
                  defaultChecked={navlinks.includes("Contact") ? true : false}
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
                value={navlinksColor}
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
                  defaultChecked={type === 1 ? true : false}
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
                  defaultChecked={type === 2 ? true : false}
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
                  defaultChecked={type === 3 ? true : false}
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
        <button className="btn btn-next" onClick={updateNavbarSection}>
          Update
        </button>
      </div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "3rem",
        }}
      >
        <div className="input">
        <h2 className="title-subform">Company</h2>
          <label htmlFor="company-title" className="company-title">
            Company Name
          </label>
          <input
            onChange={(event) => setCompanyName(event.target.value)}
            type="text"
            name="company-title"
            className="company-title"
            value={companyName}
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
            value={companyNameColor}
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
              style={{ width: "5rem", height: "5rem" }}
              src={logoUrl}
              alt="logo"
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
            defaultChecked={navlinks.includes("About") ? true : false}
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
            defaultChecked={navlinks.includes("Service") ? true : false}
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
            defaultChecked={navlinks.includes("Contact") ? true : false}
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
            value={navlinksColor}
          />
          <br />
          <br />
          <label htmlFor="background-color-navbar">Background Color</label>
          <input
            onChange={(event) => setBackgroundColor(event.target.value)}
            type="color"
            name="background-color-navbar"
            id="background-color-navbar"
            value={backgroundColor}
          />
          <br />
          <br />
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
              defaultChecked={type === 1 ? true : false}
            />
            <img
              className="selection-img"
              src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
              alt="image1"
            />
            <input
              onClick={(event) => setType(event.target.value)}
              type="radio"
              name="opt-navbar"
              id="opt2-navbar"
              defaultValue="2"
              defaultChecked={type === 2 ? true : false}
            />
            <img
              className="selection-img"
              src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
              alt="image2"
            />
            <input
              onClick={(event) => setType(event.target.value)}
              type="radio"
              name="opt-navbar"
              id="opt3-navbar"
              defaultValue="3"
              defaultChecked={type === 3 ? true : false}
            />
            <img
              className="selection-img"
              src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
              alt="image3"
            />
          </div>
          <br />
          <br />
          <button onClick={updateNavbarSection} className="button-navbar">
            Update Section
          </button>
        </div>
      </div> */}
    </section>
  );
}
