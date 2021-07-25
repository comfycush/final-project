import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { setNavbarSection, updateTemplate } from "../../store/actions/forms";
import { getImageUrl, setLogoUrl } from "../../store/actions/uploadImage";
import { useHistory } from "react-router-dom";

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
      history.push({
        pathname: "/finish",
        state: {
          templateId: allData.id,
        },
      });
    }
    console.log(dataNavbarSection, "<<< data navbar");
  }

  function uploadLogo(file, code) {
    dispatch(getImageUrl(file, code));
  }

  return (
    <section id="navbar-section">
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">
          Generate Color Palette
        </label>
        <input type="color" name="generate-color" className="generate-color" />
        <button>Refresh</button>
        <br />
        <br />
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
    </section>
  );
}
