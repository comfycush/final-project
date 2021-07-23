import React from 'react'
import '../styles/footerSection.css'

function FooterSection () {
    return (
        <section id="footer-section">
          <h1>Footer Section</h1>
          <h3>6 of 6</h3>
          <div className="input">
            <label htmlFor="generate-color" className="generate-color-label">Generate Color Palatte</label>
            <input type="color" name="generate-color" className="generate-color" />
            <button>Refresh</button><br /><br />
            <label htmlFor="link-facebook" className="link-facebook">Link Facebook</label>
            <input type="text" name="link-facebook" className="link-facebook" /><br /><br />
            <label htmlFor="link-instagram" className="link-instagram">Link Instagram</label>
            <input type="text" name="link-instagram" className="link-instagram" /><br /><br />
            <label htmlFor="link-instagram" className="link-instagram">Link Twitter</label>
            <input type="text" name="link-twitter" className="link-twitter" /><br /><br />
            <label htmlFor="link-linkedin" className="link-linkedin">Link Linkedin</label>
            <input type="text" name="link-linkedin" className="link-linkedin" /><br /><br />
            <label htmlFor="link-youtube" className="link-youtube">Link Youtube</label>
            <input type="text" name="link-youtube" className="link-youtube" /><br /><br />
            <label htmlFor="icon-color">Icon Color</label>
            <input type="radio" style={{marginLeft: '1.5rem'}} defaultValue="black" name="black-icon" id="black-icon" />
            <label htmlFor="black-icon">Black</label>
            <input type="radio" name="white-icon" defaultValue="white" id="white-icon" />
            <label htmlFor="white-icon">White</label><br /><br />
            <label htmlFor="background-color-navbar">Background Color</label>
            <input type="text" name="background-color-navbar" id="background-color-navbar" /><br /><br />
            <label htmlFor="template-layout">Template Layout</label><br /><br />
            <div className="selection-footer">
              <input type="radio" name="opt1-navbar" id="opt1-navbar" />
              <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image1" />
              <input type="radio" name="opt2-navbar" id="opt2-navbar" />
              <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image2" />
              <input type="radio" name="opt3-navbar" id="opt3-navbar" />
              <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image3" />
            </div><br /><br />
            <div className="button-footer">
              <button>prev</button>
              <button>skip</button>
              <button>finish</button>
            </div>
          </div>
        </section>
    )
}

export default FooterSection