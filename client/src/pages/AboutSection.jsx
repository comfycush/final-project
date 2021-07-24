import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setAboutSection } from '../store/actions/forms'
import '../styles/aboutSection.css'

function AboutSection () {
  const dispatch = useDispatch()
  const history = useHistory()
  const [type, setType] = useState(null)
  const [headline, setHeadline] = useState('')
  const [headlineColor, setHeadlineColor] = useState('#000000')
  const [image, setImage] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('#000000')
  const [paragraph, setParagraph] = useState('')
  const [paragraphColor, setParagraphColor] = useState('#000000')

  function addAboutSection (event) {
    event.preventDefault()
    const dataAboutSection = {
      type,
      headline,
      headlineColor,
      image,
      backgroundColor,
      paragraph,
      paragraphColor
    }

    dispatch(setAboutSection(dataAboutSection))
    history.push('/service-section')
  }

  function skipAboutSection (event) {
    event.preventDefault()
    const dataAboutSection = {
      type: null,
      headline: null,
      headlineColor: null,
      image: null,
      backgroundColor: null,
      paragraph: null,
      paragraphColor: null
    }

    dispatch(setAboutSection(dataAboutSection))
    history.push('/service-section')
  }

  return (
    <section id="about-section">
      <h1>About Section</h1>
      <h3>3 of 6</h3>
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">Generate Color Palatte</label>
        <input type="color" name="generate-color" className="generate-color" />
        <button>Refresh</button>
        <br /><br />
        <label htmlFor="about-headline" className="about-headline">Headline</label>
        <input onChange={(event) => setHeadline(event.target.value)} type="text" name="about-headline" className="about-headline" />
        <label htmlFor="about-headline" className="about-headline">Color</label>
        <input type="color" onChange={(event) => setHeadlineColor(event.target.value)} name="about-headline" className="about-headline" /><br /><br />
        <label htmlFor="about-paragraph" className="about-paragraph">Paragraph</label><br />
        <textarea onChange={(event) => setParagraph(event.target.value)} name="about-paragraph" className="about-paragraph" cols={30} rows={10} defaultValue={""} /><br /><br />
        <label htmlFor="about-paragraph" className="about-paragraph">Paragraph Color</label>
        <input type="color" onChange={(event) => setParagraphColor(event.target.value)} name="about-paragraph" className="about-paragraph" /><br /><br />
        <label htmlFor="about-image" className="about-image">Image</label>
        <input onChange={(event) => setImage(event.target.files[0])} type="file" name="about-image" className="about-image" />
        <br /><br />
        <label htmlFor="background-color-about">Background Color</label>
        <input type="color" onChange={(event) => setBackgroundColor(event.target.value)} name="background-color-about" id="background-color-about" /><br /><br />
        <label htmlFor="template-layout">Template Layout</label><br /><br />
        <div className="selection-about">
          <input onClick={(event) => setType(event.target.value)} type="radio" name="opt1-navbar" id="opt1-navbar" defaultValue="1" />
          <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image1" />
          <input onClick={(event) => setType(event.target.value)} type="radio" name="opt2-navbar" id="opt2-navbar" defaultValue="2" />
          <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image2" />
          <input onClick={(event) => setType(event.target.value)} type="radio" name="opt3-navbar" id="opt3-navbar" defaultValue="3" />
          <img className="selection-img" src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg" alt="image3" />
        </div><br /><br />
        <div className="button-about">
          <button onClick={() => history.push('/main-section')}>prev</button>
          <button onClick={skipAboutSection}>skip</button>
          <button onClick={addAboutSection}>next</button>
        </div>
      </div>
    </section>
  )
}

export default AboutSection