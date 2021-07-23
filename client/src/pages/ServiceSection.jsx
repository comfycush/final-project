import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/serviceSection.css'

function ServiceSection () {
  const state = useSelector(state => state.forms)
  console.log(state)

  return (
    <section id="service-section">
      <h1>Service Section</h1>
      <h3>4 of 6</h3>
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">Generate Color Palatte</label>
        <input type="color" name="generate-color" className="generate-color" />
        <button>Refresh</button>
        <br /><br />
        <label htmlFor="service-headline" className="service-headline">Headline</label>
        <input type="text" name="service-headline" className="service-headline" />
        <label htmlFor="service-headline" className="service-headline">Color</label>
        <input type="text" name="service-headline" className="service-headline" /><br /><br />
        <label htmlFor="service-card1" className="service-card1">Card 1 Image</label>
        <input type="file" name="service-card1" className="service-card1" />
        <br /><br />
        <label htmlFor="service-card1" className="service-card1">Card 1 Text</label>
        <input type="text" name="service-card1" className="service-card1" />
        <label htmlFor="service-card1" className="service-card1">Color</label>
        <input type="text" name="service-card1" className="service-card1" />
        <br /><br />
        <label htmlFor="service-card1" className="service-card1">Card 1 Background Color</label>
        <input type="text" name="service-card1" className="service-card1" />
        <br /><br />
        <label htmlFor="service-card2" className="service-card2">Card 2 Image</label>
        <input type="file" name="service-card2" className="service-card2" />
        <br /><br />
        <label htmlFor="service-card2" className="service-card2">Card 2 Text</label>
        <input type="text" name="service-card2" className="service-card2" />
        <label htmlFor="service-card2" className="service-card2">Color</label>
        <input type="text" name="service-card2" className="service-card2" />
        <br /><br />
        <label htmlFor="service-card2" className="service-card2">Card 2 Background Color</label>
        <input type="text" name="service-card2" className="service-card2" />
        <br /><br />            
        <label htmlFor="service-card3" className="service-card3">Card 3 Image</label>
        <input type="file" name="service-card3" className="service-card3" />
        <br /><br />
        <label htmlFor="service-card3" className="service-card3">Card 3 Text</label>
        <input type="text" name="service-card3" className="service-card3" />
        <label htmlFor="service-card3" className="service-card3">Color</label>
        <input type="text" name="service-card3" className="service-card3" />
        <br /><br />
        <label htmlFor="service-card3" className="service-card3">Card 3 Background Color</label>
        <input type="text" name="service-card3" className="service-card3" />
        <br /><br />
        <label htmlFor="background-color-service">Background Color</label>
        <input type="text" name="background-color-service" id="background-color-service" /><br /><br />
        <label htmlFor="template-layout">Template Layout</label><br /><br />
        <div className="selection-service">
          <input type="radio" name="opt1-navbar" id="opt1-navbar" />
          <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image1" />
          <input type="radio" name="opt2-navbar" id="opt2-navbar" />
          <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image2" />
          <input type="radio" name="opt3-navbar" id="opt3-navbar" />
          <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image3" />
        </div>
        <div className="button-service">
          <button>prev</button>
          <button>skip</button>
          <button>next</button>
        </div>
      </div>
    </section>
  )
}
export default ServiceSection