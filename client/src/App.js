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
import Register from "./pages/Register";
import { useLocation } from "react-router-dom";
import UpdateSection from "./pages/UpdateSection";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/register" &&
      location.pathname !== "/" &&
      location.pathname !== "/finish" ? (
        <Sidebar></Sidebar>
      ) : null}
      <Switch>
        <Route exact path="/">
          {!localStorage.access_token ? (
            <Login />
          ) : (
            <Redirect to="/dashboard" />
          )}
        </Route>
        <Route exact path="/register">
          {!localStorage.access_token ? (
            <Register />
          ) : (
            <Redirect to="/dashboard" />
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
        <Route exact path="/finish">
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
    </div>
  );
}

export default App;
