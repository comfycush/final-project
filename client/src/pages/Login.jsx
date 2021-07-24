import React, { useState } from "react"
import '../styles/login.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const dispatch= useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    axios({
      url: 'http://localhost:4000/login',
      method: 'POST',
      data: {
        email,
        password
      }
    })
      .then(({data}) => {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('email', data.email)
        setEmail('')
        setPassword('')
        history.push('/dashboard')
      })
      .catch(err => {
        console.log(err)
      })
  }

 return (
  <div className="login-card">
    <h2 className="login-title">Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb">
        <label className="email-login-label">Email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} className="email-login-input" />
      </div>
      <div className="mb">
        <label className="password-login-label">Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className="password-login-input" />
      </div>
      <div className="btn-login">
        <button className="btn" type="submit">Login</button>
      </div>
    </form>
  </div>
 )
}