import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setMainSection, updateTemplate } from "../../store/actions/forms";
import "../../styles/mainSection.css";
import { getImageUrl, setMainImageUrl } from "../../store/actions/uploadImage";
import { useLocation } from "react-router";
import { generateColorArray } from "../../store/actions/template";
import ModalImage from "../ModalImage";
import main1 from "../../assets/main1.png";
import main2 from "../../assets/main2.png";
import main3 from "../../assets/main3.png";
import Color from "../Color";

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

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalHeight, setModalHeight] = useState("");
  const [modalWidth, setModalWidth] = useState("");

  const uploadLoading = useSelector((state) => state.uploadImage.uploadLoading);

  function viewImage(image, height, width) {
    setShowModal(true);
    setModalImage(image);
    setModalHeight(height);
    setModalWidth(width);
  }

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
      new Swal("Please fill the headline", "", "error");
    } else if (!dataMainSection.image) {
      new Swal("Please fill the image", "", "error");
    } else if (!dataMainSection.type) {
      new Swal("Please choose the template layout", "", "error");
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

  function removeMainSection(event) {
    event.preventDefault();
    const dataMainSection = {
      type: null,
      image: null,
      headline: null,
      headlineColor: "#000000",
      subHeadline: null,
      subHeadlineColor: "#000000",
      backgroundColor: "#FFFFFF",
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

  function uploadMainImage(file, code) {
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
    <section id="main-section">
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
          <div className="contain-input form-center">
            <div className="form-align-center">
              <label
                htmlFor="main-headline"
                className="main-headline"
                style={{ marginRight: "3rem" }}
              >
                Text
              </label>
              <input
                onChange={(event) => setHeadline(event.target.value)}
                type="text"
                name="main-headline"
                className="main-headline"
                value={headline}
              />
            </div>
            <div className="form-align-center">
              <label
                htmlFor="main-headline"
                className="main-headline"
                style={{ marginRight: "2rem" }}
              >
                Color
              </label>
              <div className="input-color-side mt-half">
                <input
                  onChange={(event) => setHeadlineColor(event.target.value)}
                  type="color"
                  name="main-headline"
                  className="main-headline"
                  style={{ border: "none" }}
                  value={headlineColor}
                />
                <p className="color-info-tag">{headlineColor}</p>
              </div>
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Subheadline
          </h2>
          <div className="contain-input form-center">
            <div className="form-align-center">
              <label
                htmlFor="main-subheadline"
                className="main-subheadline"
                style={{ marginRight: "3rem" }}
              >
                Text
              </label>
              <input
                onChange={(event) => setSubHeadline(event.target.value)}
                type="text"
                name="main-subheadline"
                className="main-subheadline"
                value={subHeadline}
              />
            </div>
            <div className="form-align-center">
              <label
                htmlFor="main-subheadline"
                className="main-subheadline"
                style={{ marginRight: "2rem" }}
              >
                Color
              </label>
              <div className="input-color-side mt-half">
                <input
                  onChange={(event) => setsubHeadlineColor(event.target.value)}
                  type="color"
                  name="main-subheadline"
                  className="main-subheadline"
                  style={{ border: "none" }}
                  value={subHeadlineColor}
                />
                <p className="color-info-tag">{subHeadlineColor}</p>
              </div>
            </div>
          </div>
          <div className="form-align-center" style={{ marginTop: "3rem" }}>
            <label
              htmlFor="company-background"
              className="company-background"
              style={{ fontSize: "2rem", marginBottom: "2rem" }}
            >
              Image
            </label>
            <input
              id="main-image-update"
              onChange={(event) =>
                uploadMainImage(event.target.files[0], "main")
              }
              type="file"
              name="company-background"
              className="company-background"
              style={{ border: "none" }}
            />
            {uploadLoading ? (
              <img
                src="https://ik.imagekit.io/vrvrzbdh5xfk/Rolling-1s-200px__1__O7q4jtvrH.gif?updatedAt=1627456298380"
                alt="loading"
                style={{ width: "10rem", height: "10rem" }}
              />
            ) : (
              mainImageUrl && (
                <img
                  style={{
                    width: "20rem",
                    height: "10rem",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                  }}
                  src={mainImageUrl}
                  alt="about"
                />
              )
            )}
            <button
              className="btn btn-remove-image"
              onClick={() => {
                dispatch(setMainImageUrl(""));
                document.getElementById("main-image-update").value = "";
              }}
              style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
            >
              Remove Image
            </button>
          </div>
          <div
            className="form-align-center"
            style={{ marginTop: "3rem", marginBottom: "3rem" }}
          >
            <label
              htmlFor="background-color-main"
              style={{ fontSize: "2rem", marginBottom: "1rem" }}
            >
              Background Color
            </label>
            <div className="input-color-side">
              <input
                onChange={(event) => setBackgroundColor(event.target.value)}
                type="color"
                name="background-color-mainb"
                id="background-color-main"
                style={{ border: "none" }}
                value={backgroundColor}
              />
              <p className="color-info-tag">{backgroundColor}</p>
            </div>
          </div>
          <label htmlFor="template-layout" style={{ fontSize: "2rem" }}>
            Template Layout
          </label>
          <div className="selection-main" style={{ marginTop: "2rem" }}>
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
                onClick={() => viewImage(main1, "30", "80")}
              >
                <img
                  className="selection-img"
                  src={main1}
                  alt="image1"
                  onClick={() => viewImage(main1, "30", "80")}
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
                onClick={() => viewImage(main2, "30", "80")}
              >
                <img
                  className="selection-img"
                  src={main2}
                  alt="image2"
                  onClick={() => viewImage(main2, "30", "80")}
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
                onClick={() => viewImage(main3, "40", "70")}
              >
                <img
                  className="selection-img"
                  src={main3}
                  alt="image3"
                  onClick={() => viewImage(main3, "40", "70")}
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
      <div className="button-main btn-form-page">
        <button className="btn btn-remove" onClick={removeMainSection}>
          Remove Section
        </button>
        <button className="btn btn-update" onClick={updateMainSection}>
          Update Section
        </button>
      </div>
    </section>
    // <section id="main-section">
    //   <h1>Main Section</h1>
    //   <div className="input">
    //     <label htmlFor="generate-color" className="generate-color-label">
    //       Generate Color Palette
    //     </label>
    //     <input type="color" name="generate-color" className="generate-color" />
    //     <button>Refresh</button>
    //     <br />
    //     <br />
    //     <label htmlFor="main-headline" className="main-headline">
    //       Headline
    //     </label>
    //     <input
    //       onChange={(event) => setHeadline(event.target.value)}
    //       type="text"
    //       name="main-headline"
    //       className="main-headline"
    //       value={headline}
    //     />
    //     <label htmlFor="main-headline" className="main-headline">
    //       Color
    //     </label>
    //     <input
    //       onChange={(event) => setHeadlineColor(event.target.value)}
    //       type="color"
    //       name="main-headline"
    //       className="main-headline"
    //       value={headlineColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="main-subheadline" className="main-subheadline">
    //       Subheadline
    //     </label>
    //     <input
    //       onChange={(event) => setSubHeadline(event.target.value)}
    //       type="text"
    //       name="main-subheadline"
    //       className="main-subheadline"
    //       value={subHeadline}
    //     />
    //     <label htmlFor="main-subheadline" className="main-subheadline">
    //       Color
    //     </label>
    //     <input
    //       onChange={(event) => setsubHeadlineColor(event.target.value)}
    //       type="color"
    //       name="main-subheadline"
    //       className="main-subheadline"
    //       value={subHeadlineColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="company-background" className="company-background">
    //       Image
    //     </label>
    //     <input
    //       onChange={(event) => uploadMainImage(event.target.files[0], "main")}
    //       type="file"
    //       name="company-background"
    //       className="company-background"
    //     />
    //     {mainImageUrl && (
    //       <img
    //         style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
    //         src={mainImageUrl}
    //         alt="about"
    //       />
    //     )}
    //     <button onClick={() => dispatch(setMainImageUrl(""))}>
    //       Remove Image
    //     </button>
    //     <br />
    //     <br />
    //     <label htmlFor="background-color-main">Background Color</label>
    //     <input
    //       onChange={(event) => setBackgroundColor(event.target.value)}
    //       type="color"
    //       name="background-color-mainb"
    //       id="background-color-main"
    //       value={backgroundColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="template-layout">Template Layout</label>
    //     <br />
    //     <br />
    //     <div className="selection-main">
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
    //     <br />
    //     <br />
    //     <div className="button-main">
    //       <button onClick={removeMainSection}>Remove Section</button>
    //       <button onClick={updateMainSection}>Update Section</button>
    //     </div>
    //   </div>
    // </section>
  );
}

export default UpdateMainSection;
