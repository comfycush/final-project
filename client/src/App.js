import "./App.css";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
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
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const { templateId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const toNavbar = useSelector(state => state.navigation.toNavbar)
  const toMainSection = useSelector(state => state.navigation.toMainSection)
  const toAboutSection = useSelector(state => state.navigation.toAboutSection)
  const toServiceSection = useSelector(state => state.navigation.toServiceSection)
  const toContactSection = useSelector(state => state.navigation.toContactSection)
  const toFooterSection = useSelector(state => state.navigation.toFooterSection)
  const prevPage = location.pathname
  const history = useHistory()
  
  console.log(toNavbar, `ini toNavbar`)
  console.log(toMainSection, `ini toMainSection`)
  console.log(toAboutSection, `ini toAboutSection`)
  console.log(toServiceSection, `ini toServiceSection`)
  console.log(toContactSection, `ini toContactSection`)
  console.log(toFooterSection, `ini toFooterSection`)

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
            <Homepage setIsOpen={setIsOpen}></Homepage>
          ) : (
            <Redirect to="/dashboard" />
          )}
        </Route>
        <Route exact path="/login">
          {!localStorage.access_token ? (
            <Login setIsOpen={setIsOpen}></Login>
          ) : (
            <Redirect to="/dashboard" />
          )}
        </Route>
        <Route exact path="/register">
          {!localStorage.access_token ? (
            <Register setIsOpen={setIsOpen} />
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
          { localStorage.access_token ?
            ( toNavbar ? 
              ( <NavbarSection></NavbarSection> )
                : ( <Redirect to="/intro-section" />) &&
               ( <IntroSection></IntroSection> )
            ) : ( <Redirect to="/" /> )
          }
        </Route>
        <Route exact path="/main-section">
          { localStorage.access_token ?
            ( toMainSection ? 
              ( <MainSection></MainSection> )
                : ( <Redirect to="/navbar-section" /> &&
                <NavbarSection></NavbarSection> )
            ) : ( <Redirect to="/" /> )
          }
        </Route>
        <Route exact path="/about-section">
          { localStorage.access_token ?
            ( toAboutSection ? 
              ( <AboutSection></AboutSection> )
                : ( <Redirect to="/main-section" /> &&
                <MainSection></MainSection> )
            ) : ( <Redirect to="/" /> )
          }
        </Route>
        <Route exact path="/service-section">
          { localStorage.access_token ?
            ( toServiceSection ? 
              ( <ServiceSection></ServiceSection> )
                : ( <Redirect to="/about-section" /> &&
                <AboutSection></AboutSection> )
            ) : ( <Redirect to="/" /> )
          }
        </Route>
        <Route exact path="/contact-section">
          { localStorage.access_token ?
            ( toContactSection ? 
              ( <ContactSection></ContactSection> )
                : ( <Redirect to="/service-section" /> && 
                <ServiceSection></ServiceSection> )
            ) : ( <Redirect to="/" /> )
          }
        </Route>
        <Route exact path="/footer-section">
          { localStorage.access_token ?
            ( toFooterSection ? 
              ( <FooterSection></FooterSection> )
                : ( <Redirect to="/contact-section" /> &&
                <ContactSection></ContactSection> )
            ) : ( <Redirect to="/" /> )
          }
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
