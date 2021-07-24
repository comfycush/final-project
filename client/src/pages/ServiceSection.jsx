import React, { useState } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/serviceSection.css";
import { setServiceSection, updateTemplate } from "../store/actions/forms";
import { getImageUrl } from "../store/actions/uploadImage";
import { useLocation } from "react-router";

function ServiceSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(null);
  const [headline, setHeadline] = useState("");
  const [headlineColor, setHeadlineColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#000000");

  // const [cardImage1, setCardImage1] = useState('')
  const card1ImageUrl = useSelector((state) => state.uploadImage.card1ImageUrl);
  const [cardBackgroundColor1, setcardBackgroundColor1] = useState("#000000");
  const [cardTitle1, setCardTitle1] = useState("");
  const [cardTitleColor1, setCardTitleColor1] = useState("#000000");
  const [cardText1, setCardText1] = useState("");
  const [cardTextColor1, setCardTextColor1] = useState("#000000");

  // const [cardImage2, setCardImage2] = useState('')
  const card2ImageUrl = useSelector((state) => state.uploadImage.card2ImageUrl);
  const [cardBackgroundColor2, setcardBackgroundColor2] = useState("#000000");
  const [cardTitle2, setCardTitle2] = useState("");
  const [cardTitleColor2, setCardTitleColor2] = useState("#000000");
  const [cardText2, setCardText2] = useState("");
  const [cardTextColor2, setCardTextColor2] = useState("#000000");

  // const [cardImage3, setCardImage3] = useState('')
  const card3ImageUrl = useSelector((state) => state.uploadImage.card3ImageUrl);
  const [cardBackgroundColor3, setcardBackgroundColor3] = useState("#000000");
  const [cardTitle3, setCardTitle3] = useState("");
  const [cardTitleColor3, setCardTitleColor3] = useState("#000000");
  const [cardText3, setCardText3] = useState("");
  const [cardTextColor3, setCardTextColor3] = useState("#000000");

  const stateAbout = location.state;
  const templateId = 3;

  function addServiceSection() {
    const dataServiceSection = {
      type: +type,
      headline,
      headlineColor,
      backgroundColor,
      cardImage1: card1ImageUrl,
      cardBackgroundColor1,
      cardTitle1,
      cardTitleColor1,
      cardText1,
      cardTextColor1,
      cardImage2: card2ImageUrl,
      cardBackgroundColor2,
      cardTitle2,
      cardTitleColor2,
      cardText2,
      cardTextColor2,
      cardImage3: card3ImageUrl,
      cardBackgroundColor3,
      cardTitle3,
      cardTitleColor3,
      cardText3,
      cardTextColor3,
    };

    if (!dataServiceSection.headline) {
      swal("Please fill your headline");
    } else if (
      //bingung
      !dataServiceSection.cardTitle1 &&
      !dataServiceSection.cardTitle2 &&
      !dataServiceSection.cardTitle3
    ) {
      swal("Please fill minimum 1 card title");
    } else if (!dataServiceSection.type) {
      swal("Please choose your required template");
    } else {
      dispatch(setServiceSection(dataServiceSection));
      const newestTemplate = {
        ...stateAbout,
        service: dataServiceSection,
        contact: {},
        footer: {},
      };
      dispatch(updateTemplate(templateId, newestTemplate));
      history.push({
        pathname: "/contact-section",
        state: {
          ...stateAbout,
          service: dataServiceSection,
        },
      });
    }
  }

  function skipServiceSection() {
    const dataServiceSection = {
      type: null,
      headline: null,
      headlineColor: null,
      backgroundColor: null,
      cardImage1: null,
      cardBackgroundColor1: null,
      cardTitle1: null,
      cardTitleColor1: null,
      cardText1: null,
      cardTextColor1: null,
      cardImage2: null,
      cardBackgroundColor2: null,
      cardTitle2: null,
      cardTitleColor2: null,
      cardText2: null,
      cardTextColor2: null,
      cardImage3: null,
      cardBackgroundColor3: null,
      cardTitle3: null,
      cardTitleColor3: null,
      cardText3: null,
      cardTextColor3: null,
    };

    dispatch(setServiceSection(dataServiceSection));
    history.push("/contact-section");
  }

  function uploadCardImage(file, code) {
    dispatch(getImageUrl(file, code));
  }

  return (
    <section id="service-section">
      <h1>Service Section</h1>
      <h3>4 of 6</h3>
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">
          Generate Color Palatte
        </label>
        <input type="color" name="generate-color" className="generate-color" />
        <button>Refresh</button>
        <br />
        <br />
        <label htmlFor="service-headline" className="service-headline">
          Headline
        </label>
        <input
          onChange={(event) => setHeadline(event.target.value)}
          type="text"
          name="service-headline"
          className="service-headline"
        />
        <label htmlFor="service-headline" className="service-headline">
          Color
        </label>
        <input
          onChange={(event) => setHeadlineColor(event.target.value)}
          type="color"
          name="service-headline"
          className="service-headline"
        />
        <br />
        <br />
        <label htmlFor="service-card1" className="service-card1">
          Card 1 Icon
        </label>
        <input
          onChange={(event) => uploadCardImage(event.target.files[0], "card1")}
          type="file"
          name="service-card1"
          className="service-card1"
        />
        {card1ImageUrl && (
          <img
            style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
            src={card1ImageUrl}
            alt="card 1"
          />
        )}
        <br />
        <br />
        <label htmlFor="service-card1" className="service-card1">
          Card 1 Title
        </label>
        <input
          onChange={(event) => setCardTitle1(event.target.value)}
          type="text"
          name="service-card1"
          className="service-card1"
        />
        <label htmlFor="service-card1" className="service-card1">
          Color
        </label>
        <input
          type="color"
          onChange={(event) => setCardTitleColor1(event.target.value)}
          name="service-card1"
          className="service-card1"
        />
        <br />
        <br />
        <label htmlFor="service-card1" className="service-card1">
          Card 1 Paragraph
        </label>
        <input
          onChange={(event) => setCardText1(event.target.value)}
          type="text"
          name="service-card1"
          className="service-card1"
        />
        <label htmlFor="service-card1" className="service-card1">
          Color
        </label>
        <input
          type="color"
          onChange={(event) => setCardTextColor1(event.target.value)}
          name="service-card1"
          className="service-card1"
        />
        <br />
        <br />
        <label htmlFor="service-card1" className="service-card1">
          Card 1 Background Color
        </label>
        <input
          type="color"
          onChange={(event) => setcardBackgroundColor1(event.target.value)}
          name="service-card1"
          className="service-card1"
        />
        <br />
        <br />
        <label htmlFor="service-card2" className="service-card2">
          Card 2 Icon
        </label>
        <input
          onChange={(event) => uploadCardImage(event.target.files[0], "card2")}
          type="file"
          name="service-card2"
          className="service-card2"
        />
        {card2ImageUrl && (
          <img
            style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
            src={card2ImageUrl}
            alt="card 2"
          />
        )}
        <br />
        <br />
        <label htmlFor="service-card2" className="service-card2">
          Card 2 Title
        </label>
        <input
          onChange={(event) => setCardTitle2(event.target.value)}
          type="text"
          name="service-card2"
          className="service-card2"
        />
        <label htmlFor="service-card2" className="service-card2">
          Color
        </label>
        <input
          type="color"
          onChange={(event) => setCardTitleColor2(event.target.value)}
          name="service-card2"
          className="service-card2"
        />
        <br />
        <br />
        <label htmlFor="service-card2" className="service-card2">
          Card 2 Paragraph
        </label>
        <input
          onChange={(event) => setCardText2(event.target.value)}
          type="text"
          name="service-card2"
          className="service-card2"
        />
        <label htmlFor="service-card2" className="service-card2">
          Color
        </label>
        <input
          type="color"
          onChange={(event) => setCardTextColor2(event.target.value)}
          name="service-card2"
          className="service-card2"
        />
        <br />
        <br />
        <label htmlFor="service-card2" className="service-card2">
          Card 2 Background Color
        </label>
        <input
          type="color"
          onChange={(event) => setcardBackgroundColor2(event.target.value)}
          name="service-card2"
          className="service-card2"
        />
        <br />
        <br />
        <label htmlFor="service-card3" className="service-card3">
          Card 3 Icon
        </label>
        <input
          onChange={(event) => uploadCardImage(event.target.files[0], "card3")}
          type="file"
          name="service-card3"
          className="service-card3"
        />
        {card3ImageUrl && (
          <img
            style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
            src={card3ImageUrl}
            alt="card 3"
          />
        )}
        <br />
        <br />
        <label htmlFor="service-card3" className="service-card3">
          Card 3 Title
        </label>
        <input
          onChange={(event) => setCardTitle3(event.target.value)}
          type="text"
          name="service-card3"
          className="service-card3"
        />
        <label htmlFor="service-card3" className="service-card3">
          Color
        </label>
        <input
          type="color"
          onChange={(event) => setCardTitleColor3(event.target.value)}
          name="service-card3"
          className="service-card3"
        />
        <br />
        <br />
        <label htmlFor="service-card3" className="service-card3">
          Card 3 Paragraph
        </label>
        <input
          onChange={(event) => setCardText3(event.target.value)}
          type="text"
          name="service-card3"
          className="service-card3"
        />
        <label htmlFor="service-card3" className="service-card3">
          Color
        </label>
        <input
          type="color"
          onChange={(event) => setCardTextColor3(event.target.value)}
          name="service-card3"
          className="service-card3"
        />
        <br />
        <br />
        <label htmlFor="service-card3" className="service-card3">
          Card 3 Background Color
        </label>
        <input
          type="color"
          onChange={(event) => setcardBackgroundColor3(event.target.value)}
          name="service-card3"
          className="service-card3"
        />
        <br />
        <br />
        <label htmlFor="background-color-service">Background Color</label>
        <input
          type="color"
          onChange={(event) => setBackgroundColor(event.target.value)}
          name="background-color-service"
          id="background-color-service"
        />
        <br />
        <br />
        <label htmlFor="template-layout">Template Layout</label>
        <br />
        <br />
        <div className="selection-service">
          <input
            onClick={(event) => setType(event.target.value)}
            defaultValue="1"
            type="radio"
            name="opt1-navbar"
            id="opt1-navbar"
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
            name="opt2-navbar"
            id="opt2-navbar"
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
            name="opt3-navbar"
            id="opt3-navbar"
          />
          <img
            className="selection-img"
            src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
            alt="image3"
          />
        </div>
        <div className="button-service">
          <button onClick={skipServiceSection}>skip</button>
          <button onClick={addServiceSection}>next</button>
        </div>
      </div>
    </section>
  );
}
export default ServiceSection;
