import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/serviceSection.css";
import { setServiceSection, updateTemplate } from "../../store/actions/forms";
import {
  getImageUrl,
  setCardImage1Url,
  setCardImage2Url,
  setCardImage3Url,
} from "../../store/actions/uploadImage";
import { useLocation } from "react-router";
import { generateColorArray } from "../../store/actions/template";
import service1 from "../../assets/service1.png";
import service2 from "../../assets/service2.png";
import service3 from "../../assets/service3.png";
import Color from "../Color";
import ModalImage from "../ModalImage";

export default function UpdateServiceSection({ data, allData }) {
  console.log(data, "<<< data");
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(data.type);
  const [headline, setHeadline] = useState(data.headline);
  const [headlineColor, setHeadlineColor] = useState(data.headlineColor);
  const [backgroundColor, setBackgroundColor] = useState(data.backgroundColor);

  // const [cardImage1, setCardImage1] = useState('')
  const card1ImageUrl = useSelector((state) => state.uploadImage.card1ImageUrl);
  const [cardBackgroundColor1, setcardBackgroundColor1] = useState(
    data.cardBackgroundColor1
  );
  const [cardTitle1, setCardTitle1] = useState(data.cardTitle1);
  const [cardTitleColor1, setCardTitleColor1] = useState(data.cardTitleColor1);
  const [cardText1, setCardText1] = useState(data.cardText1);
  const [cardTextColor1, setCardTextColor1] = useState(data.cardTextColor1);

  // const [cardImage2, setCardImage2] = useState('')
  const card2ImageUrl = useSelector((state) => state.uploadImage.card2ImageUrl);
  const [cardBackgroundColor2, setcardBackgroundColor2] = useState(
    data.cardBackgroundColor2
  );
  const [cardTitle2, setCardTitle2] = useState(data.cardTitle2);
  const [cardTitleColor2, setCardTitleColor2] = useState(data.cardTitleColor2);
  const [cardText2, setCardText2] = useState(data.cardText2);
  const [cardTextColor2, setCardTextColor2] = useState(data.cardTextColor2);

  // const [cardImage3, setCardImage3] = useState('')
  const card3ImageUrl = useSelector((state) => state.uploadImage.card3ImageUrl);
  const [cardBackgroundColor3, setcardBackgroundColor3] = useState(
    data.cardBackgroundColor3
  );
  const [cardTitle3, setCardTitle3] = useState(data.cardTitle3);
  const [cardTitleColor3, setCardTitleColor3] = useState(data.cardTitleColor3);
  const [cardText3, setCardText3] = useState(data.cardText3);
  const [cardTextColor3, setCardTextColor3] = useState(data.cardTextColor3);

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
    dispatch(setCardImage1Url(data.cardImage1));
    dispatch(setCardImage2Url(data.cardImage2));
    dispatch(setCardImage3Url(data.cardImage3));
  }, []);

  console.log(data.cardImage1, "data card image 1");

  function updateServiceSection() {
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
      const updatedTemplate = {
        isDeploy: allData.isDeploy,
        projectTitle: allData.projectTitle,
        userId: allData.userId,
        navbar: allData.navbar,
        main: allData.main,
        about: allData.about,
        service: dataServiceSection,
        contact: allData.contact,
        footer: allData.footer,
      };
      dispatch(updateTemplate(allData.id, updatedTemplate));
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
  }

  function removeServiceSection() {
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
    const updatedTemplate = {
      isDeploy: allData.isDeploy,
      projectTitle: allData.projectTitle,
      userId: allData.userId,
      navbar: allData.navbar,
      main: allData.main,
      about: allData.about,
      service: dataServiceSection,
      contact: allData.contact,
      footer: allData.footer,
    };
    dispatch(updateTemplate(allData.id, updatedTemplate));
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

  function uploadCardImage(file, code) {
    dispatch(getImageUrl(file, code));
  }

  function generateColor() {
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
    <section id="service-section">
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
            <label htmlFor="service-headline" className="service-headline">
              Headline
            </label>
            <input
              onChange={(event) => setHeadline(event.target.value)}
              type="text"
              name="service-headline"
              className="service-headline"
              style={{ marginBottom: "1rem" }}
              value={headline}
            />
            <label htmlFor="service-headline" className="service-headline">
              Color
            </label>
            <input
              onChange={(event) => setHeadlineColor(event.target.value)}
              type="color"
              name="service-headline"
              className="service-headline"
              value={headlineColor}
            />
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            First Card
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label
                htmlFor="service-card1"
                className="service-card1"
                style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
              >
                Icon
              </label>
              <input
                onChange={(event) =>
                  uploadCardImage(event.target.files[0], "card1")
                }
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
              <button
                className="btn btn-remove-image"
                onClick={() => dispatch(setCardImage1Url(""))}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
            <div className="form-align-center sub-card">
              <label htmlFor="service-card1" className="service-card1">
                Title
              </label>
              <input
                onChange={(event) => setCardTitle1(event.target.value)}
                type="text"
                name="service-card1"
                className="service-card1"
                value={cardTitle1}
              />
              <label
                htmlFor="service-card1"
                className="service-card1"
                style={{ marginTop: "1rem" }}
              >
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTitleColor1(event.target.value)}
                name="service-card1"
                className="service-card1"
                value={cardTitleColor1}
              />
            </div>
            <div className="form-align-center sub-card">
              <label
                htmlFor="service-card1"
                className="service-card1"
                style={{ marginBottom: "0.5rem" }}
              >
                Paragraph
              </label>
              <input
                onChange={(event) => setCardText1(event.target.value)}
                type="text"
                name="service-card1"
                className="service-card1"
                value={cardText1}
              />
              <label
                htmlFor="service-card1"
                className="service-card1"
                style={{ marginTop: "1rem" }}
              >
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTextColor1(event.target.value)}
                name="service-card1"
                className="service-card1"
                value={cardTextColor1}
              />
            </div>
            <div className="form-align-center">
              <label htmlFor="service-card1" className="service-card1">
                Background Color
              </label>
              <input
                type="color"
                onChange={(event) =>
                  setcardBackgroundColor1(event.target.value)
                }
                name="service-card1"
                className="service-card1"
                style={{ marginTop: "1rem" }}
                value={cardBackgroundColor1}
              />
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Second Card
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label
                htmlFor="service-card2"
                className="service-card2"
                style={{ marginBottom: "1rem" }}
              >
                Icon
              </label>
              <input
                onChange={(event) =>
                  uploadCardImage(event.target.files[0], "card2")
                }
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
              <button
                className="btn btn-remove-image"
                onClick={() => dispatch(setCardImage2Url(""))}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
            <div className="form-align-center sub-card">
              <label htmlFor="service-card2" className="service-card2">
                Title
              </label>
              <input
                onChange={(event) => setCardTitle2(event.target.value)}
                type="text"
                name="service-card2"
                className="service-card2"
                style={{ marginBottom: "0.5rem" }}
                value={cardTitle2}
              />
              <label htmlFor="service-card2" className="service-card2">
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTitleColor2(event.target.value)}
                name="service-card2"
                className="service-card2"
                value={cardTitleColor2}
              />
            </div>
            <div className="form-align-center sub-card">
              <label
                htmlFor="service-card2"
                className="service-card2"
                style={{ marginBottom: "0.5rem" }}
              >
                Paragraph
              </label>
              <input
                onChange={(event) => setCardText2(event.target.value)}
                type="text"
                name="service-card2"
                className="service-card2"
                style={{ marginBottom: "0.5rem" }}
                value={cardText2}
              />
              <label htmlFor="service-card2" className="service-card2">
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTextColor2(event.target.value)}
                name="service-card2"
                className="service-card2"
                value={cardTextColor2}
              />
            </div>
            <div className="form-align-center">
              <label
                htmlFor="service-card2"
                className="service-card2"
                style={{ marginBottom: "0.5rem" }}
              >
                Background Color
              </label>
              <input
                type="color"
                onChange={(event) =>
                  setcardBackgroundColor2(event.target.value)
                }
                name="service-card2"
                className="service-card2"
                value={cardBackgroundColor2}
              />
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Third Card
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label
                htmlFor="service-card3"
                className="service-card3"
                style={{ marginBottom: "1rem" }}
              >
                Icon
              </label>
              <input
                onChange={(event) =>
                  uploadCardImage(event.target.files[0], "card3")
                }
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
              <button
                className="btn btn-remove-image"
                onClick={() => dispatch(setCardImage3Url(""))}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
            <div className="form-align-center sub-card">
              <label htmlFor="service-card3" className="service-card3">
                Title
              </label>
              <input
                onChange={(event) => setCardTitle3(event.target.value)}
                type="text"
                name="service-card3"
                className="service-card3"
                value={cardTitle3}
              />
              <label htmlFor="service-card3" className="service-card3">
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTitleColor3(event.target.value)}
                name="service-card3"
                className="service-card3"
                value={cardTitleColor3}
              />
            </div>
            <div className="form-align-center sub-card">
              <label htmlFor="service-card3" className="service-card3">
                Paragraph
              </label>
              <input
                onChange={(event) => setCardText3(event.target.value)}
                type="text"
                name="service-card3"
                className="service-card3"
                value={cardText3}
              />
              <label htmlFor="service-card3" className="service-card3">
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTextColor3(event.target.value)}
                name="service-card3"
                className="service-card3"
                value={cardTextColor3}
              />
            </div>
            <div className="form-align-center">
              <label htmlFor="service-card3" className="service-card3">
                Background Color
              </label>
              <input
                type="color"
                onChange={(event) =>
                  setcardBackgroundColor3(event.target.value)
                }
                name="service-card3"
                className="service-card3"
                value={cardBackgroundColor3}
              />
            </div>
          </div>
          <div className="form-align-center">
            <label
              htmlFor="background-color-service"
              style={{ margin: "1rem 0", fontSize: "2rem" }}
            >
              Background Color
            </label>
            <input
              type="color"
              onChange={(event) => setBackgroundColor(event.target.value)}
              name="background-color-service"
              id="background-color-service"
              value={backgroundColor}
              style={{ marginBottom: "2rem" }}
            />
          </div>
          <label htmlFor="template-layout" style={{ fontSize: "2rem" }}>
            Template Layout
          </label>
          <div className="selection-service" style={{ marginTop: "2rem" }}>
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
                onClick={() => viewImage(service1, "35", "70")}
              >
                <img
                  className="selection-img"
                  src={service1}
                  alt="image1"
                  onClick={() => viewImage(service1, "35", "70")}
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
                onClick={() => viewImage(service2, "35", "70")}
              >
                <img
                  className="selection-img"
                  src={service2}
                  alt="image2"
                  onClick={() => viewImage(service2, "35", "70")}
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
                onClick={() => viewImage(service3, "45", "25")}
              >
                <img
                  className="selection-img"
                  src={service3}
                  alt="image3"
                  onClick={() => viewImage(service3, "45", "25")}
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
        <button className="btn btn-skip" onClick={removeServiceSection}>
          Remove Section
        </button>
        <button className="btn btn-next" onClick={updateServiceSection}>
          Update Section
        </button>
      </div>
    </section>
    // <section id="service-section">
    //   <div className="input">
    //     <label htmlFor="generate-color" className="generate-color-label">
    //       Generate Color Palette
    //     </label>
    //     <input type="color" name="generate-color" className="generate-color" />
    //     <button>Refresh</button>
    //     <br />
    //     <br />
    //     <label htmlFor="service-headline" className="service-headline">
    //       Headline
    //     </label>
    //     <input
    //       onChange={(event) => setHeadline(event.target.value)}
    //       type="text"
    //       name="service-headline"
    //       className="service-headline"
    //       value={headline}
    //     />
    //     <label htmlFor="service-headline" className="service-headline">
    //       Color
    //     </label>
    //     <input
    //       onChange={(event) => setHeadlineColor(event.target.value)}
    //       type="color"
    //       name="service-headline"
    //       className="service-headline"
    //       value={headlineColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="service-card1" className="service-card1">
    //       Card 1 Icon
    //     </label>
    //     <input
    //       onChange={(event) => uploadCardImage(event.target.files[0], "card1")}
    //       type="file"
    //       name="service-card1"
    //       className="service-card1"
    //     />
    //     {card1ImageUrl && (
    //       <img
    //         style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
    //         src={card1ImageUrl}
    //         alt="card 1"
    //       />
    //     )}
    //     <button onClick={() => dispatch(setCardImage1Url(""))}>
    //       Remove Image
    //     </button>
    //     <br />
    //     <br />
    //     <label htmlFor="service-card1" className="service-card1">
    //       Card 1 Title
    //     </label>
    //     <input
    //       onChange={(event) => setCardTitle1(event.target.value)}
    //       type="text"
    //       name="service-card1"
    //       className="service-card1"
    //       value={cardTitle1}
    //     />
    //     <label htmlFor="service-card1" className="service-card1">
    //       Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setCardTitleColor1(event.target.value)}
    //       name="service-card1"
    //       className="service-card1"
    //       value={cardTitleColor1}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="service-card1" className="service-card1">
    //       Card 1 Paragraph
    //     </label>
    //     <input
    //       onChange={(event) => setCardText1(event.target.value)}
    //       type="text"
    //       name="service-card1"
    //       className="service-card1"
    //       value={cardText1}
    //     />
    //     <label htmlFor="service-card1" className="service-card1">
    //       Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setCardTextColor1(event.target.value)}
    //       name="service-card1"
    //       className="service-card1"
    //       value={cardTextColor1}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="service-card1" className="service-card1">
    //       Card 1 Background Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setcardBackgroundColor1(event.target.value)}
    //       name="service-card1"
    //       className="service-card1"
    //       value={cardBackgroundColor1}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="service-card2" className="service-card2">
    //       Card 2 Icon
    //     </label>
    //     <input
    //       onChange={(event) => uploadCardImage(event.target.files[0], "card2")}
    //       type="file"
    //       name="service-card2"
    //       className="service-card2"
    //     />
    //     {card2ImageUrl && (
    //       <img
    //         style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
    //         src={card2ImageUrl}
    //         alt="card 2"
    //       />
    //     )}
    //     <button onClick={() => dispatch(setCardImage2Url(""))}>
    //       Remove Image
    //     </button>
    //     <br />
    //     <br />
    //     <label htmlFor="service-card2" className="service-card2">
    //       Card 2 Title
    //     </label>
    //     <input
    //       onChange={(event) => setCardTitle2(event.target.value)}
    //       type="text"
    //       name="service-card2"
    //       className="service-card2"
    //       value={cardTitle2}
    //     />
    //     <label htmlFor="service-card2" className="service-card2">
    //       Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setCardTitleColor2(event.target.value)}
    //       name="service-card2"
    //       className="service-card2"
    //       value={cardTitleColor2}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="service-card2" className="service-card2">
    //       Card 2 Paragraph
    //     </label>
    //     <input
    //       onChange={(event) => setCardText2(event.target.value)}
    //       type="text"
    //       name="service-card2"
    //       className="service-card2"
    //       value={cardText2}
    //     />
    //     <label htmlFor="service-card2" className="service-card2">
    //       Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setCardTextColor2(event.target.value)}
    //       name="service-card2"
    //       className="service-card2"
    //       value={cardTextColor2}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="service-card2" className="service-card2">
    //       Card 2 Background Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setcardBackgroundColor2(event.target.value)}
    //       name="service-card2"
    //       className="service-card2"
    //       value={cardBackgroundColor2}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="service-card3" className="service-card3">
    //       Card 3 Icon
    //     </label>
    //     <input
    //       onChange={(event) => uploadCardImage(event.target.files[0], "card3")}
    //       type="file"
    //       name="service-card3"
    //       className="service-card3"
    //     />
    //     {card3ImageUrl && (
    //       <img
    //         style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
    //         src={card3ImageUrl}
    //         alt="card 3"
    //       />
    //     )}
    //     <button onClick={() => dispatch(setCardImage3Url(""))}>
    //       Remove Image
    //     </button>
    //     <br />
    //     <br />
    //     <label htmlFor="service-card3" className="service-card3">
    //       Card 3 Title
    //     </label>
    //     <input
    //       onChange={(event) => setCardTitle3(event.target.value)}
    //       type="text"
    //       name="service-card3"
    //       className="service-card3"
    //       value={cardTitle3}
    //     />
    //     <label htmlFor="service-card3" className="service-card3">
    //       Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setCardTitleColor3(event.target.value)}
    //       name="service-card3"
    //       className="service-card3"
    //       value={cardTitleColor3}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="service-card3" className="service-card3">
    //       Card 3 Paragraph
    //     </label>
    //     <input
    //       onChange={(event) => setCardText3(event.target.value)}
    //       type="text"
    //       name="service-card3"
    //       className="service-card3"
    //       value={cardText3}
    //     />
    //     <label htmlFor="service-card3" className="service-card3">
    //       Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setCardTextColor3(event.target.value)}
    //       name="service-card3"
    //       className="service-card3"
    //       value={cardTextColor3}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="service-card3" className="service-card3">
    //       Card 3 Background Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setcardBackgroundColor3(event.target.value)}
    //       name="service-card3"
    //       className="service-card3"
    //       value={cardBackgroundColor3}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="background-color-service">Background Color</label>
    //     <input
    //       type="color"
    //       onChange={(event) => setBackgroundColor(event.target.value)}
    //       name="background-color-service"
    //       id="background-color-service"
    //       value={backgroundColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="template-layout">Template Layout</label>
    //     <br />
    //     <br />
    //     <div className="selection-service">
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
    //     <div className="button-service">
    //       <button onClick={removeServiceSection}>Remove Section</button>
    //       <button onClick={updateServiceSection}>Update Section</button>
    //     </div>
    //   </div>
    // </section>
  );
}
// export default ServiceSection;
