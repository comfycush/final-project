import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RenderFinish from "./pages/RenderFinish";
import Dashboard from "./pages/Dashboard";
import NavbarSection from "./pages/NavbarSection";
import IntroSection from "./pages/IntroSection";
import MainSection from "./pages/MainSection";
import AboutSection from "./pages/AboutSection";
import ServiceSection from "./pages/ServiceSection";
import ContactSection from "./pages/ContactSection";
import FooterSection from "./pages/FooterSection";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import { useLocation } from "react-router-dom";
import UpdateSection from "./pages/UpdateSection";
import Deploy from "./pages/Deploy";
import { useParams } from "react-router";

import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const { templateId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="body-pd" className={isOpen ? "body-pd" : ""}>
      {location.pathname !== "/register" &&
      location.pathname !== "/" &&
      location.pathname !== "/login" &&
      location.pathname.substring(0, 7) !== "/finish" &&
      location.pathname.substring(0, 7) !== "/deploy" ? (
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}></Sidebar>
      ) : null}
      <Switch>
        <Route exact path="/">
          {!localStorage.access_token ? (
            <Homepage></Homepage>
          ) : (
            <Redirect to="/dashboard" />
          )}
        </Route>
        <Route exact path="/login">
          {!localStorage.access_token ? (
            <Login></Login>
          ) : (
            <Redirect to="/dashboard" />
          )}
        </Route>
        <Route exact path="/register">
          {!localStorage.access_token ? (
            <Register />
          ) : (
            localStorage.colorArray && <Redirect to="/dashboard" />
          )}
        </Route>
        <Route exact path="/dashboard">
          {localStorage.access_token ? (
            <Dashboard></Dashboard>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/intro-section">
          {localStorage.access_token ? (
            <IntroSection></IntroSection>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/navbar-section">
          {localStorage.access_token ? (
            <NavbarSection></NavbarSection>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/main-section">
          {localStorage.access_token ? (
            <MainSection></MainSection>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/about-section">
          {localStorage.access_token ? (
            <AboutSection></AboutSection>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/service-section">
          {localStorage.access_token ? (
            <ServiceSection></ServiceSection>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/contact-section">
          {localStorage.access_token ? (
            <ContactSection></ContactSection>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/footer-section">
          {localStorage.access_token ? (
            <FooterSection></FooterSection>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/deploy/:companyName/:templateId">
          <Deploy></Deploy>
        </Route>
        <Route exact path="/finish/:templateId">
          {localStorage.access_token ? (
            <RenderFinish></RenderFinish>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/update-template">
          <UpdateSection></UpdateSection>
        </Route>
      </Switch>
    </section>
  );
}

export default App;
