import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setNavbarSection } from '../store/actions/forms'
import '../styles/navbarSection.css'

function NavbarSection () {
  const history = useHistory()
  const dispatch = useDispatch()
  const [type, setType] = useState(null)
  const [logo, setLogo] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyNameColor, setCompanyNameColor] = useState('')
  const [navlinks, setNavlinks] = useState([])
  const [navlinksColor, setNavlinksColor] = useState('')

  function addNavlink (status, input) {
    if (status) {
      setNavlinks([...navlinks, input])
    }
    else {
      const currentNavlinks = navlinks.filter((navlink) => navlink !== input)
      setNavlinks(currentNavlinks)
    }
  }
 
  function addNavbarSection (event) {
    event.preventDefault()
    const dataNavbar = {
      type,
      logo,
      backgroundColor,
      companyName,
      companyNameColor,
      navlinks,
      navlinksColor
    }

    dispatch(setNavbarSection(dataNavbar))
    history.push('/main-section')
  }

  return (
  <section id="navbar-section">
      <h1>Navbar Section</h1>
      <h3>1 of 6</h3>
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">Generate Color Palatte</label>
        <input type="color" name="generate-color" className="generate-color" />
        <button>Refresh</button>
        <br /><br />
        <label htmlFor="company-title" className="company-title">Company Title</label>
        <input onChange={(event) => setCompanyName(event.target.value)} type="text" name="company-title" className="company-title" />
        <label htmlFor="company-title-color" className="company-title-color">Color</label>
        <input onChange={(event) => setCompanyNameColor(event.target.value)} type="text" name="company-title-color" className="company-title-color" /><br /><br />
        <label htmlFor="company-logo" className="company-logo">Your Company Logo</label>
        {/* <input type="file" name="company-logo" className="company-logo" /> */}
        <input onChange={(event) => setLogo(event.target.value)} type="text" name="company-logo" id="company-logo" />
        <br /><br />
        <label htmlFor="links-navbar">Links</label>
        <input type="checkbox" onClick={(event) => addNavlink(event.target.checked, event.target.value)} name="about" id="about" style={{marginLeft: '1.5rem'}} defaultValue="About" />
        <label htmlFor="about">About</label>
        <input type="checkbox" onClick={(event) => addNavlink(event.target.checked, event.target.value)} name="service" id="service" defaultValue="Service" />
        <label htmlFor="about">Service</label>
        <input type="checkbox" onClick={(event) => addNavlink(event.target.checked, event.target.value)} name="contact" id="contact" defaultValue="Contact" />
        <label htmlFor="contact">Contact</label><br /><br />
        <label htmlFor="color-navbar">Color</label>
        <input type="text" onChange={(event) => setNavlinksColor(event.target.value)} name="color-navbar" id="color-navbar" /><br /><br />
        <label htmlFor="background-color-navbar">Background Color</label>
        <input onChange={(event) => setBackgroundColor(event.target.value)} type="text" name="background-color-navbar" id="background-color-navbar" /><br /><br />
        <label htmlFor="template-layout">Template Layout</label><br /><br />
        <div className="selection-navbar">
          <input onClick={(event) => setType(event.target.value)} type="radio" name="opt1-navbar" id="opt1-navbar" defaultValue='1' />
          <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image1" />
          <input onClick={(event) => setType(event.target.value)} type="radio" name="opt2-navbar" id="opt2-navbar" defaultValue='2' />
          <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image2" />
          <input onClick={(event) => setType(event.target.value)} type="radio" name="opt3-navbar" id="opt3-navbar" defaultValue='3' />
          <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image3" />
        </div><br /><br />
        <button onClick={addNavbarSection} className="button-navbar">next</button>
      </div>
  </section>
  )
}

export default NavbarSection