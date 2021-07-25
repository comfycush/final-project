import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setMainSection, updateTemplate } from "../../store/actions/forms";
import "../../styles/mainSection.css";
import { getImageUrl, setMainImageUrl } from "../../store/actions/uploadImage";
import { useLocation } from "react-router";

function UpdateMainSection({ data, allData }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [headline, setHeadline] = useState(data.headline);
  const [headlineColor, setHeadlineColor] = useState(data.headlineColor);
  // const [image, setImage] = useState('')
  const [backgroundColor, setBackgroundColor] = useState(data.backgroundColor);
  const [subHeadline, setSubHeadline] = useState(data.subHeadline);
  const [subHeadlineColor, setsubHeadlineColor] = useState(
    data.subHeadlineColor
  );
  const [type, setType] = useState(data.type);
  const mainImageUrl = useSelector((state) => state.uploadImage.mainImageUrl);
  // const mainImageUrl = data.image;

  // console.log(mainImageUrl, "<<< image url");

  useEffect(() => {
    dispatch(setMainImageUrl(data.image));
  }, []);

  function updateMainSection(event) {
    event.preventDefault();
    const dataMainSection = {
      type: +type,
      image: mainImageUrl,
      headline,
      headlineColor,
      subHeadline,
      subHeadlineColor,
      backgroundColor,
    };

    if (!dataMainSection.headline) {
      swal("Please fill your headline");
    } else if (!dataMainSection.image) {
      swal("Please fill your image");
    } else if (!dataMainSection.type) {
      swal("Please choose your require template");
    } else {
      dispatch(setMainSection(dataMainSection));
      const updatedTemplate = {
        isDeploy: allData.isDeploy,
        projectTitle: allData.projectTitle,
        userId: allData.userId,
        navbar: allData.navbar,
        main: dataMainSection,
        about: allData.about,
        service: allData.service,
        contact: allData.contact,
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

  function removeMainSection(event) {
    event.preventDefault();
    const dataMainSection = {
      type: null,
      image: null,
      headline: null,
      headlineColor: null,
      subHeadline: null,
      subHeadlineColor: null,
      backgroundColor: null,
    };

    dispatch(setMainSection(dataMainSection));
    const updatedTemplate = {
      isDeploy: allData.isDeploy,
      projectTitle: allData.projectTitle,
      userId: allData.userId,
      navbar: allData.navbar,
      main: dataMainSection,
      about: allData.about,
      service: allData.service,
      contact: allData.contact,
      footer: allData.footer,
    };
    // history.push("/about-section");
    dispatch(updateTemplate(allData.id, updatedTemplate));
    history.push({
      pathname: "/finish",
      state: {
        templateId: allData.id,
      },
    });
  }

  function uploadMainImage(file, code) {
    dispatch(getImageUrl(file, code));
  }

  return (
    <section id="main-section">
      <h1>Main Section</h1>
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">
          Generate Color Palatte
        </label>
        <input type="color" name="generate-color" className="generate-color" />
        <button>Refresh</button>
        <br />
        <br />
        <label htmlFor="main-headline" className="main-headline">
          Headline
        </label>
        <input
          onChange={(event) => setHeadline(event.target.value)}
          type="text"
          name="main-headline"
          className="main-headline"
          value={headline}
        />
        <label htmlFor="main-headline" className="main-headline">
          Color
        </label>
        <input
          onChange={(event) => setHeadlineColor(event.target.value)}
          type="color"
          name="main-headline"
          className="main-headline"
          value={headlineColor}
        />
        <br />
        <br />
        <label htmlFor="main-subheadline" className="main-subheadline">
          Subheadline
        </label>
        <input
          onChange={(event) => setSubHeadline(event.target.value)}
          type="text"
          name="main-subheadline"
          className="main-subheadline"
          value={subHeadline}
        />
        <label htmlFor="main-subheadline" className="main-subheadline">
          Color
        </label>
        <input
          onChange={(event) => setsubHeadlineColor(event.target.value)}
          type="color"
          name="main-subheadline"
          className="main-subheadline"
          value={subHeadlineColor}
        />
        <br />
        <br />
        <label htmlFor="company-background" className="company-background">
          Image
        </label>
        <input
          onChange={(event) => uploadMainImage(event.target.files[0], "main")}
          type="file"
          name="company-background"
          className="company-background"
        />
        {mainImageUrl && (
          <img
            style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
            src={mainImageUrl}
            alt="about"
          />
        )}
        <button onClick={() => dispatch(setMainImageUrl(""))}>
          Remove Image
        </button>
        <br />
        <br />
        <label htmlFor="background-color-main">Background Color</label>
        <input
          onChange={(event) => setBackgroundColor(event.target.value)}
          type="color"
          name="background-color-mainb"
          id="background-color-main"
          value={backgroundColor}
        />
        <br />
        <br />
        <label htmlFor="template-layout">Template Layout</label>
        <br />
        <br />
        <div className="selection-main">
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
        <br />
        <br />
        <div className="button-main">
          {/* <button onClick={removeMainSection}>Remove Section</button> */}
          <button onClick={updateMainSection}>Update Section</button>
        </div>
      </div>
    </section>
  );
}

export default UpdateMainSection;
