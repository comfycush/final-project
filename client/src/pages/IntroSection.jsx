import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setProjectTitle } from '../store/actions/forms'
import '../styles/introSection.css'

function IntroSection () {
  const dispatch = useDispatch()
  const history = useHistory()
  const [proTitle, setProTitle] = useState('')

  function addProjectTitle (event) {
    dispatch(setProjectTitle(proTitle))
    event.preventDefault()
    history.push('/navbar-section')
  }

  return (
      <section id="intro-section">
        <h1>Let's Build Your Website</h1>
        <div className="intro-input">
          <label htmlFor="project-title">Project Title</label>
          <input required onChange={(event) => setProTitle(event.target.value)} style={{marginLeft: '1rem'}} type="text" name="project-title" id="project-title" />
        </div><br /><br />
        <button onClick={addProjectTitle} className="button-navbar">next</button>
      </section>
  )
}

export default IntroSection