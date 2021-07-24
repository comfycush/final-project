import React, { useState } from "react"
import '../styles/register.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    axios({
      url: 'http://localhost:4000/register',
      method: 'POST',
      data: {
        email,
        password
      }
    })
      .then(() => {
        history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="register-card">
    <h2 className="register-title">Register</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb">
        <label className="email-register-label">Email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} className="email-register-input" />
      </div>
      <div className="mb">
        <label className="password-register-label">Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className="password-register-input" />
      </div>
      <div className="btn-register">
        <button className="btn" type="submit">Register</button>
      </div>
    </form>
  </div>
  )
}