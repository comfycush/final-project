import "./App.css";
import { Switch, Route } from "react-router-dom";
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

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/finish" && <Sidebar></Sidebar>}
      <Switch>
        <Route exact path="/" >
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard></Dashboard>
        </Route>
        <Route exact path="/intro-section">
          <IntroSection></IntroSection>
        </Route>
        <Route exact path="/navbar-section">
          <NavbarSection></NavbarSection>
        </Route>
        <Route exact path="/main-section">
          <MainSection></MainSection>
        </Route>
        <Route exact path="/about-section">
          <AboutSection></AboutSection>
        </Route>
        <Route exact path="/service-section">
          <ServiceSection></ServiceSection>
        </Route>
        <Route exact path="/contact-section">
          <ContactSection></ContactSection>
        </Route>
        <Route exact path="/footer-section">
          <FooterSection></FooterSection>
        </Route>
        <Route exact path="/finish">
          <RenderFinish></RenderFinish>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
