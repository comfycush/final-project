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
import { useSelector } from 'react-redux'

function App() {
  const location = useLocation();
  const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn)
  return (
    <div className="App">
      {
        location.pathname !== '/register' && location.pathname !== '/' && location.pathname !== '/finish' ?
          <Sidebar></Sidebar>
          :
          null
      }
      <Switch>
        <Route exact path="/" >
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/dashboard">
          {isLoggedIn ? <Dashboard></Dashboard> : <Redirect to='/' />}
        </Route>
        <Route exact path="/intro-section">
          {isLoggedIn ? <IntroSection></IntroSection> : <Redirect to='/' />}          
        </Route>
        <Route exact path="/navbar-section">
          {isLoggedIn ? <NavbarSection></NavbarSection> : <Redirect to='/' />}          
        </Route>
        <Route exact path="/main-section">
          {isLoggedIn ? <MainSection></MainSection> : <Redirect to='/' />}
        </Route>
        <Route exact path="/about-section">
          {isLoggedIn ? <AboutSection></AboutSection> : <Redirect to='/' />}
        </Route>
        <Route exact path="/service-section">
          {isLoggedIn ? <ServiceSection></ServiceSection> : <Redirect to='/' />}
        </Route>
        <Route exact path="/contact-section">
          {isLoggedIn ? <ContactSection></ContactSection> : <Redirect to='/' />}
        </Route>
        <Route exact path="/footer-section">
          {isLoggedIn ? <FooterSection></FooterSection> : <Redirect to='/' />}
        </Route>
        <Route exact path="/finish">
          {isLoggedIn ? <RenderFinish></RenderFinish> : <Redirect to='/' />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
