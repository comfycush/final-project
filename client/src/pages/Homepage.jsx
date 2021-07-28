import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { HashLink } from "react-router-hash-link";
import "../styles/homepage.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { setReplyChatbot } from "../store/actions/forms";
import { useDispatch } from "react-redux";

function Homepage({ setIsOpen }) {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    setIsOpen(false);
    dispatch(setReplyChatbot(""));
  }, []);

  return (
    <div className="wrapper-homepage">
      <div className="navbar-homepage">
        <div className="logo-homepage">
          <h4>
            web<span>ber</span>
          </h4>
        </div>
        <div className="links-homepage">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <div data-aos="fade-down" className="landing-page-homepage">
        <div className="landingText-homepage">
          <h1>
            Welcome To Web<span>ber</span>!
          </h1>
          <br />
          <h3>
            Webber is a web app that allows you to build your own company
            website in less than 10 minutes!
          </h3>
          <div className="btn-learn">
            <HashLink to={"#how-to"}>Learn More</HashLink>
            {/* <a onClick=""></a> */}
          </div>
        </div>
        <div className="landingImage-homepage">
          <img
            src="https://ik.imagekit.io/gdx8okwg6gt/1055666_Rs7KYlFOO.png?updatedAt=1627351585500"
            alt="computer"
          />
        </div>
      </div>
      <div style={{ paddingTop: "7rem" }} id="how-to" className="h1-style">
        <h1 data-aos="fade-down">How To Build Your Own Website</h1>
      </div>
      <div className="about-homepage">
        <div className="aboutText-homepage">
          <img
            data-aos="fade-right"
            src="https://ik.imagekit.io/gdx8okwg6gt/3014261_PLJ04Ys-e.png?updatedAt=1627351586708"
            alt="login"
          />
        </div>
        <div data-aos="fade-left" className="aboutList-homepage">
          <h3>Register And Login To Your Account</h3>
          <br />
          <h4>Create an account to start building your website!</h4>
        </div>
      </div>
      <div className="about-2-homepage">
        <div data-aos="fade-right" className="aboutList-2-homepage">
          <h3>Craft Your Website Content</h3>
          <br />
          <h4>Fill in your company information for the website</h4>
        </div>
        <div data-aos="fade-left" className="aboutText-2-homepage">
          <img
            src="https://image.flaticon.com/icons/png/512/5024/5024461.png"
            alt="form"
          />
        </div>
      </div>
      <div className="about-3-homepage">
        <div className="aboutText-3-homepage">
          <img
            data-aos="fade-right"
            src="https://image.flaticon.com/icons/png/512/1055/1055687.png"
            alt="hooray"
          />
        </div>
        <div data-aos="fade-left" className="aboutList-3-homepage">
          <h3>Your Website Is Ready!</h3>
          <br />
          <h4>Now you can share your website to your customers</h4>
          <div className="btn-start">
            <Link to="/login">Start Now</Link>
          </div>
        </div>
      </div>
      <div className="footer-homepage">
        <h2>
          web<span>ber</span>
        </h2>
        <h4>Copyright 2021 || Web Builder</h4>
      </div>
    </div>
  );
}

export default Homepage;
