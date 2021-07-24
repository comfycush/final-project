import React from 'react'
import '../styles/updateSection.css'

function UpdateSection () {
    return (
        <section id="update-section">
          <h1>Update Section</h1><br />
          <div className="input">
            <select name="select-section" className="select-section">
              <option value="navbar">Navbar</option>
              <option value="main">Main</option>
              <option value="about">About</option>
              <option value="service">Service</option>
              <option value="contact">Contact</option>
              <option value="footer">Footer</option>
            </select><br /><br />
            <label htmlFor="generate-color" className="generate-color-label">Generate Color Palatte</label>
            <input type="color" name="generate-color" className="generate-color" />
            <button>Refresh</button>
            <br /><br />
            <label htmlFor="company-title" className="company-title">Company Title</label>
            <input type="text" name="company-title" className="company-title" />
            <label htmlFor="company-title-color" className="company-title-color">Color</label>
            <input type="text" name="company-title-color" className="company-title-color" /><br /><br />
            <label htmlFor="company-logo" className="company-logo">Your Company Logo</label>
            <input type="file" name="company-logo" className="company-logo" />
            <br /><br />
            <label htmlFor="links-navbar">Links</label>
            <input type="radio" name="about" id="about" style={{marginLeft: '1.5rem'}} defaultValue="About" />
            <label htmlFor="about">About</label>
            <input type="radio" name="service" id="service" defaultValue="Service" />
            <label htmlFor="about">Service</label>
            <input type="radio" name="contact" id="contact" defaultValue="Contact" />
            <label htmlFor="contact">Contact</label><br /><br />
            <label htmlFor="color-navbar">Color</label>
            <input type="text" name="color-navbar" id="color-navbar" /><br /><br />
            <label htmlFor="background-color-navbar">Background Color</label>
            <input type="text" name="background-color-navbar" id="background-color-navbar" /><br /><br />
            <label htmlFor="template-layout">Template Layout</label><br /><br />
            <div className="selection-navbar">
              <input type="radio" name="opt1-navbar" id="opt1-navbar" />
              <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image1" />
              <input type="radio" name="opt2-navbar" id="opt2-navbar" />
              <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image2" />
              <input type="radio" name="opt3-navbar" id="opt3-navbar" />
              <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image3" />
            </div><br /><br />
            <button className="button-navbar">Update</button>
          </div>
        </section>
    )
}

export default UpdateSection