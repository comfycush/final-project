import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "../styles/homepage.css";
import Aos from "aos";
import "aos/dist/aos.css";

function Homepage() {
  const history = useHistory();
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className="wrapper">
      <div className="navbar-homepage">
        <div className="logo-homepage">
          <h4>
            Web<span>ber</span>
          </h4>
        </div>
        <div className="links-homepage">
          <a onClick={() => history.push("/login")}>Login</a>
          <a onClick={() => history.push("/register")}>Register</a>
        </div>
      </div>
      <div data-aos="fade-down" className="landing-page-homepage">
        <div className="landingText-homepage">
          <h1>
            Welcome to Web<span>ber</span>!
          </h1>
          <br />
          <h3>
            Webber is a web app that allows you <br /> to build your own company
            website in less <br /> than 10 minutes!
          </h3>
          <div className="btn-learn">
            <a href="#">Learn More</a>
          </div>
        </div>
        <div className="landingImage-homepage">
          <img
            src="https://o.remove.bg/downloads/5575c009-c07c-4fab-b9a5-aa30669dd7e4/1055666-removebg-preview.png"
            alt="computer"
          />
        </div>
      </div>
      <div className="about-homepage">
        <div className="aboutText-homepage">
          <h1 data-aos="fade-down">How To Build Your Own Website</h1>
          <img
            data-aos="fade-right"
            src="https://o.remove.bg/downloads/21a3018e-e192-4527-a416-0e688b661ee9/3014261-removebg-preview.png"
            alt="login"
          />
        </div>
        <div data-aos="fade-left" className="aboutList-homepage">
          <h3>Login to your account</h3>
          <br />
          <h4>So you can use and create your own website!</h4>
        </div>
      </div>
      <div className="about-2-homepage">
        <div data-aos="fade-right" className="aboutList-2-homepage">
          <h3>Fill the required forms</h3>
          <br />
          <h4>Start styling your own website!</h4>
        </div>
        <div data-aos="fade-left" className="aboutText-2-homepage">
          <img
            src="https://o.remove.bg/downloads/91d2816b-349f-4a3d-aa44-5017c0fa6ea1/2234689-removebg-preview.png"
            alt="form"
          />
        </div>
      </div>
      <div className="about-3-homepage">
        <div className="aboutText-3-homepage">
          <img
            data-aos="fade-right"
            src="https://o.remove.bg/downloads/87386680-f1e1-4807-b6c0-164789b27560/190411-removebg-preview.png"
            alt="hooray"
          />
        </div>
        <div data-aos="fade-left" className="aboutList-3-homepage">
          <h3>Success</h3>
          <br />
          <h4>Hooray! You have create your personal website</h4>
          <div className="btn-start">
            <a onClick={() => history.push("/login")}>Start Now</a>
          </div>
        </div>
      </div>
      <div className="footer-homepage">
        <h2>
          Web<span>ber</span>
        </h2>
        <h4>Copyright 2021 || Web Builder</h4>
      </div>
    </div>
  );
}

export default Homepage;
