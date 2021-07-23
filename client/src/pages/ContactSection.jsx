import React from 'react'
import '../styles/contactSection.css'

function ContactSection () {
    return (
        <section id="contact-section">
          <h1>Contact Section</h1>
          <h3>5 of 6</h3>
          <div className="input">
            <label htmlFor="generate-color" className="generate-color-label">Generate Color Palatte</label>
            <input type="color" name="generate-color" className="generate-color" />
            <button>Refresh</button><br /><br />
            <label htmlFor="contact-headline" className="contact-headline">Headline</label>
            <input type="text" name="contact-headline" className="contact-headline" />
            <label htmlFor="contact-headline" className="contact-headline">Color</label>
            <input type="text" name="contact-headline" className="contact-headline" /><br /><br />
            <label htmlFor="contact-email" className="contact-email">Email</label>
            <input type="text" name="contact-email" className="contact-email" />
            <label htmlFor="contact-email" className="contact-email">Color</label>
            <input type="text" name="contact-email" className="contact-email" /><br /><br />
            <label htmlFor="contact-email" className="contact-email">Email Icon</label>
            <input type="file" name="contact-email" className="contact-email" /><br /><br />
            <label htmlFor="contact-phone" className="contact-phone">Phone</label>
            <input type="text" name="contact-phone" className="contact-phone" />
            <label htmlFor="contact-phone" className="contact-phone">Color</label>
            <input type="text" name="contact-phone" className="contact-phone" /><br /><br />
            <label htmlFor="contact-phone" className="contact-phone">Phone Icon</label>
            <input type="file" name="contact-phone" className="contact-phone" /><br /><br />
            <label htmlFor="contact-address" className="contact-address">Address</label>
            <input type="text" name="contact-address" className="contact-address" />
            <label htmlFor="contact-address" className="contact-address">Color</label>
            <input type="text" name="contact-address" className="contact-address" /><br /><br />
            <label htmlFor="contact-address" className="contact-address">Address Icon</label>
            <input type="file" name="contact-address" className="contact-address" /><br /><br />
            <label htmlFor="background-color-contact">Background Color</label>
            <input type="text" name="background-color-contact" id="background-color-contact" /><br /><br />
            <label htmlFor="template-layout">Template Layout</label><br /><br />
            <div className="selection-contact">
              <input type="radio" name="opt1-navbar" id="opt1-navbar" />
              <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image1" />
              <input type="radio" name="opt2-navbar" id="opt2-navbar" />
              <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image2" />
              <input type="radio" name="opt3-navbar" id="opt3-navbar" />
              <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image3" />
            </div>
            <div className="button-contact">
              <button>prev</button>
              <button>skip</button>
              <button>next</button>
            </div>
          </div>
        </section>
    )
}

export default ContactSection