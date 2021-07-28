import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../../styles/aboutSection.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAboutSection, updateTemplate } from "../../store/actions/forms";
import { getImageUrl, setAboutImageUrl } from "../../store/actions/uploadImage";
import { useLocation } from "react-router";
import { generateColorArray } from "../../store/actions/template";
import about1 from "../../assets/about1.png";
import about2 from "../../assets/about2.png";
import about3 from "../../assets/about3.png";
import ModalImage from "../ModalImage";
import Color from "../Color";

export default function UpdateAboutForm({ data, allData }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(data.type);
  const [headline, setHeadline] = useState(data.headline);
  const [headlineColor, setHeadlineColor] = useState(data.headlineColor);
  // const [image, setImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(data.backgroundColor);
  const [paragraph, setParagraph] = useState(data.paragraph);
  const [paragraphColor, setParagraphColor] = useState(data.paragraphColor);

  const aboutImageUrl = useSelector((state) => state.uploadImage.aboutImageUrl);
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
    dispatch(setAboutImageUrl(data.image));
  }, []);

  console.log(aboutImageUrl, "<<< about url");

  function updateAboutSection(event) {
    event.preventDefault();
    const dataAboutSection = {
      type: +type,
      headline,
      headlineColor,
      image: aboutImageUrl,
      backgroundColor,
      paragraph,
      paragraphColor,
    };

    if (!dataAboutSection.headline) {
      new Swal("Please fill the headline", "", "error");
    } else if (!dataAboutSection.paragraph) {
      new Swal("Please fill the paragraph", "", "error");
    } else if (!dataAboutSection.image) {
      new Swal("Please fill the image", "", "error");
    } else if (!dataAboutSection.type) {
      new Swal("Please choose the template layout", "", "error");
    } else {
      dispatch(setAboutSection(dataAboutSection));
      const updatedTemplate = {
        isDeploy: allData.isDeploy,
        projectTitle: allData.projectTitle,
        userId: allData.userId,
        navbar: allData.navbar,
        main: allData.main,
        about: dataAboutSection,
        service: allData.service,
        contact: allData.contact,
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

  function removeAboutSection(event) {
    event.preventDefault();
    const dataAboutSection = {
      type: null,
      headline: null,
      headlineColor: "#000000",
      image: null,
      backgroundColor: "#FFFFFF",
      paragraph: null,
      paragraphColor: "#000000",
    };
    dispatch(setAboutSection(dataAboutSection));
    // history.push("/service-section");
    const updatedTemplate = {
      isDeploy: allData.isDeploy,
      projectTitle: allData.projectTitle,
      userId: allData.userId,
      navbar: allData.navbar,
      main: allData.main,
      about: dataAboutSection,
      service: allData.service,
      contact: allData.contact,
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

  function uploadAboutImage(file, code) {
    dispatch(getImageUrl(file, code));
  }

  function generateColor() {
    dispatch(generateColorArray());
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

  return (
    <section id="about-section">
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
              <label htmlFor="about-headline" className="about-headline">
                Text
              </label>
              <input
                onChange={(event) => setHeadline(event.target.value)}
                type="text"
                name="about-headline"
                className="about-headline"
                style={{ marginBottom: "1rem" }}
                value={headline}
              />
              <label htmlFor="about-headline" className="about-headline">
                Color
              </label>
              <div className="input-color-side mt-half">
                <input
                  type="color"
                  onChange={(event) => setHeadlineColor(event.target.value)}
                  name="about-headline"
                  className="about-headline"
                  value={headlineColor}
                />
                <p className="color-info-tag">{headlineColor}</p>
              </div>
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Paragraph
          </h2>
          <div className="contain-input form-align-center">
            {/* <div style={{ display: "flex", alignItems: "flex-start" }}></div> */}
            <label htmlFor="about-paragraph" className="about-paragraph">
              Text
            </label>
            <textarea
              onChange={(event) => setParagraph(event.target.value)}
              name="about-paragraph"
              className="about-paragraph mt-half"
              cols={30}
              rows={10}
              defaultValue={""}
              style={{ marginBottom: "1rem" }}
              value={paragraph}
            />
            <label htmlFor="about-paragraph" className="about-paragraph">
              Color
            </label>
            <div className="input-color-side mt-half">
              <input
                type="color"
                onChange={(event) => setParagraphColor(event.target.value)}
                name="about-paragraph"
                className="about-paragraph"
                value={paragraphColor}
              />
              <p className="color-info-tag">{paragraphColor}</p>
            </div>
          </div>
          <div className="form-align-center" style={{ marginTop: "3rem" }}>
            <label
              htmlFor="about-image"
              className="about-image"
              style={{ fontSize: "2rem", marginBottom: "2rem" }}
            >
              Image
            </label>
            <input
              id="about-image-update"
              onChange={(event) =>
                uploadAboutImage(event.target.files[0], "about")
              }
              type="file"
              name="about-image"
              className="about-image"
            />
            {uploadLoading ? (
              <img
                src="https://ik.imagekit.io/vrvrzbdh5xfk/Rolling-1s-200px__1__O7q4jtvrH.gif?updatedAt=1627456298380"
                alt="loading"
                style={{ width: "10rem", height: "10rem" }}
              />
            ) : (
              aboutImageUrl && (
                <img
                  style={{
                    width: "20rem",
                    height: "10rem",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                  }}
                  src={aboutImageUrl}
                  alt="about"
                />
              )
            )}
            <button
              className="btn btn-remove-image"
              onClick={() => {
                dispatch(setAboutImageUrl(""));
                document.getElementById("about-image-update").value = "";
              }}
              style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
            >
              Remove Image
            </button>
          </div>
          <div className="form-align-center">
            <label
              htmlFor="background-color-about"
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                marginTop: "2rem",
              }}
            >
              Background Color
            </label>
            <div className="input-color-side mb-2">
              <input
                type="color"
                onChange={(event) => setBackgroundColor(event.target.value)}
                name="background-color-about"
                id="background-color-about"
                value={backgroundColor}
              />
              <p className="color-info-tag">{backgroundColor}</p>
            </div>
          </div>
          <label htmlFor="template-layout" style={{ fontSize: "2rem" }}>
            Template Layout
          </label>
          <div className="selection-about" style={{ marginTop: "2rem" }}>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                type="radio"
                name="opt-navbar"
                id="opt1-navbar"
                defaultValue="1"
                defaultChecked={type === 1 ? true : false}
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(about1, "25", "80")}
              >
                <img
                  className="selection-img"
                  src={about1}
                  alt="image1"
                  onClick={() => viewImage(about1, "25", "80")}
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
                defaultChecked={type === 2 ? true : false}
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(about2, "25", "80")}
              >
                <img
                  className="selection-img"
                  src={about2}
                  alt="image2"
                  onClick={() => viewImage(about2, "25", "80")}
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
                defaultChecked={type === 3 ? true : false}
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(about3, "35", "80")}
              >
                <img
                  className="selection-img"
                  src={about3}
                  alt="image3"
                  onClick={() => viewImage(about3, "35", "80")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
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
      <div className="button-about btn-form-page">
        <button className="btn btn-remove" onClick={removeAboutSection}>
          Remove Section
        </button>
        <button className="btn btn-update" onClick={updateAboutSection}>
          Update Section
        </button>
      </div>
    </section>
    // <section id="about-section">
    //   <div className="input">
    //     <label htmlFor="generate-color" className="generate-color-label">
    //       Generate Color Palette
    //     </label>
    //     <input type="color" name="generate-color" className="generate-color" />
    //     <button>Refresh</button>
    //     <br />
    //     <br />
    //     <label htmlFor="about-headline" className="about-headline">
    //       Headline
    //     </label>
    //     <input
    //       onChange={(event) => setHeadline(event.target.value)}
    //       type="text"
    //       name="about-headline"
    //       className="about-headline"
    //       value={headline}
    //     />
    //     <label htmlFor="about-headline" className="about-headline">
    //       Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setHeadlineColor(event.target.value)}
    //       name="about-headline"
    //       className="about-headline"
    //       value={headlineColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="about-paragraph" className="about-paragraph">
    //       Paragraph
    //     </label>
    //     <br />
    //     <textarea
    //       onChange={(event) => setParagraph(event.target.value)}
    //       name="about-paragraph"
    //       className="about-paragraph"
    //       cols={30}
    //       rows={10}
    //       // defaultValue={""}
    //       value={paragraph}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="about-paragraph" className="about-paragraph">
    //       Paragraph Color
    //     </label>
    //     <input
    //       type="color"
    //       onChange={(event) => setParagraphColor(event.target.value)}
    //       name="about-paragraph"
    //       className="about-paragraph"
    //       value={paragraphColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="about-image" className="about-image">
    //       Image
    //     </label>
    //     <input
    //       onChange={(event) => uploadAboutImage(event.target.files[0], "about")}
    //       type="file"
    //       name="about-image"
    //       className="about-image"
    //     />
    //     {aboutImageUrl && (
    //       <img
    //         style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
    //         src={aboutImageUrl}
    //         alt="about"
    //       />
    //     )}
    //     <button onClick={() => dispatch(setAboutImageUrl(""))}>
    //       Remove Image
    //     </button>
    //     <br />
    //     <br />
    //     <label htmlFor="background-color-about">Background Color</label>
    //     <input
    //       type="color"
    //       onChange={(event) => setBackgroundColor(event.target.value)}
    //       name="background-color-about"
    //       id="background-color-about"
    //       value={backgroundColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="template-layout">Template Layout</label>
    //     <br />
    //     <br />
    //     <div className="selection-about">
    //       <input
    //         onClick={(event) => setType(event.target.value)}
    //         type="radio"
    //         name="opt-navbar"
    //         id="opt1-navbar"
    //         defaultValue="1"
    //         defaultChecked={type === 1 ? true : false}
    //       />
    //       <img
    //         className="selection-img"
    //         src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
    //         alt="image1"
    //       />
    //       <input
    //         onClick={(event) => setType(event.target.value)}
    //         type="radio"
    //         name="opt-navbar"
    //         id="opt2-navbar"
    //         defaultValue="2"
    //         defaultChecked={type === 2 ? true : false}
    //       />
    //       <img
    //         className="selection-img"
    //         src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
    //         alt="image2"
    //       />
    //       <input
    //         onClick={(event) => setType(event.target.value)}
    //         type="radio"
    //         name="opt-navbar"
    //         id="opt3-navbar"
    //         defaultValue="3"
    //         defaultChecked={type === 3 ? true : false}
    //       />
    //       <img
    //         className="selection-img"
    //         src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
    //         alt="image3"
    //       />
    //     </div>
    //     <br />
    //     <br />
    //     <div className="button-about">
    //       <button onClick={removeAboutSection}>Remove Section</button>
    //       <button onClick={updateAboutSection}>Update Section</button>
    //     </div>
    //   </div>
    // </section>
  );
}
