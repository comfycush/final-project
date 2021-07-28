const axios = require('axios')
const e = require('express')
const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

jest.mock('axios')

let user_data = {
  email: 'test@mail.com',
  password: '12345',
}

afterAll((done) => {
  if(process.env.NODE_ENV == 'test') {
    User.destroy({ truncate: true })
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
  }
}) 

describe('Register Customer [SUCCESS CASE]', () => {
  test('Should send an object with keys: id, email', (done) => {
    request(app)
      .post('/register')
      .send(user_data)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('email', expect.any(String))
          expect(res.body).toHaveProperty('id', expect.any(Number))
          done()
        }
      })
  })
})

describe('Register Customer [ERROR CASE]', () => {
  test('Failed because email not inputted', (done) => {
    const user_email_empty = {...user_data, email: null}
    request(app)
    .post('/register')
    .send(user_email_empty)
    .end((err, res) => {
      if (err) {
        return done(err)
      } else {
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(['Email is required'])
        done()
      }
    })
  })

  test('Failed because password not inputted', (done) => {
    const user_invalid_password = {...user_data, password: null}
    request(app)
    .post('/register')
    .send(user_invalid_password)
    .end((err, res) => {
      if (err) {
        return done(err)
      } else {
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(['Password is required'])
        done()
      }
    })
  })

  test('Failed because email is empty', (done) => {
    const user_empty_email = {...user_data, email: ''}
    request(app)
    .post('/register')
    .send(user_empty_email)
    .end((err, res) => {
      if (err) {
        return done(err)
      } else {
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toContain('Email cannot be empty')
        done()
      }
    })
  })
  
  test('Failed because password is empty', (done) => {
    const user_empty_password = {...user_data, password: ''}
    request(app)
    .post('/register')
    .send(user_empty_password)
    .end((err, res) => {
      if (err) {
        return done(err)
      } else {
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toContain('Password cannot be empty')
        done()
      }
    })
  })

  test('Failed because email has already been used', (done) => {
    request(app)
    .post('/register')
    .send(user_data)
    .end((err, res) => {
      if (err) {
        return done(err)
      } else {
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(['Email already used'])
        done()
      }
    })
  })

  test('Failed because of invalid email format', (done) => {
    const user_invalid_email = {...user_data, email: 'testmail.com'}
    request(app)
    .post('/register')
    .send(user_invalid_email)
    .end((err, res) => {
      if (err) {
        return done(err)
      } else {
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toContain('Incorrect email format')
        done()
      }
    })
  })

  test('Failed because password is Float', (done) => {
    const userFailedPassword = {
      email: 'test4@mail.com',
      password: parseFloat(2.4)
    }
    request(app)
      .post('/register')
      .send(userFailedPassword)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(500)
          expect(res.body).toHaveProperty('errors', expect.any(String))
          expect(res.body.errors).toEqual('Illegal arguments: number, string')
          done()
        }
      })
  })
})

describe('Customer Login [SUCCESS CASE]', () => {
  test('Should send an object with keys: access_token, id, email', (done) => {
    request(app)
      .post('/login')
      .send(user_data)
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('access_token', expect.any(String))
          expect(res.body).toHaveProperty('email', user_data.email)
          expect(res.body).toHaveProperty('id', expect.any(Number))
          done()
        }
      })
  })
})

describe('Customer Login [ERROR CASE]', () => {
  test('Failed because password not match', (done) => {
    const user_wrong_password = {...user_data, password: 'wrong password'}
    request(app)
      .post('/login')
      .send(user_wrong_password)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toContain('Invalid email/password')
          done()
        }
      })
  })

  test('Failed because email not found', (done) => {
    const user_wrong_email = {...user_data, email: 'wrong@mail.com'}
    request(app)
      .post('/login')
      .send(user_wrong_email)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('errors', expect.any(Object))
          expect(res.body.errors).toContain('Invalid email/password')
          done()
        }
      })
  })

  test('Failed because email is Float', (done) => {
    const user_email_float = {
      email: parseFloat(2.4),
      password: '12345'
    }
    request(app)
      .post('/login')
      .send(user_email_float)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(500)
          expect(res.body).toHaveProperty('errors', expect.any(String))
          expect(res.body.errors).toEqual('operator does not exist: character varying = numeric')
          done()
        }
      })
  })
})

describe('User Google Login [ERROR CASE]', () => {
  test('Should send an object with key: access_token, id, email', (done) => {
    let objToken = {
      token: 'invalid_token'
    }
    request(app)
      .post('/googleLogin')
      .send(objToken) // dummy harus diganti dengan id_token yg dikirim google
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(500)
          expect(res.body).toHaveProperty('errors', expect.any(String))
          expect(res.body.errors).toEqual('Wrong number of segments in token: invalid_token')
          done()
        }
      })
  })
})

describe('User Google Login [SUCCESS CASE]', () => {
  
  test('Should send an object with key: access_token, id, email', (done) => {
    const resp = {
      data: {
        access_token: 'asdasdasdasd',
        id: '1',
        email: 'user@mail.com'
      }
    }
    axios.mockResolvedValue(resp)
    
    request(app)
      .post('/googleLogin')
      .send({
        token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkZjBhODMxZTA5M2ZhZTFlMjRkNzdkNDc4MzQ0MDVmOTVkMTdiNTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTAzNTUyMTA3NDYxOC1ua290cGNlYjNwNjBtdXUwaDVybWY2aG41cGU3MmR0Yy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjEwMzU1MjEwNzQ2MTgtbmtvdHBjZWIzcDYwbXV1MGg1cm1mNmhuNXBlNzJkdGMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ0ODQwMDg0MzgxMDAyMzkzMDEiLCJlbWFpbCI6ImZhZGhpbG1obW1kQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUmlsWjh5dnJiZGd0cnpkYk5uY1NoUSIsIm5hbWUiOiJGYWRoaWwgTXVoYW1tYWQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2pUbk0yMTM4dlZxTzZmc2dYQlBWcG5kTkZmUVhsM0EyamVwdUphY1E9czk2LWMiLCJnaXZlbl9uYW1lIjoiRmFkaGlsIiwiZmFtaWx5X25hbWUiOiJNdWhhbW1hZCIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjI3NDM4MzY1LCJleHAiOjE2Mjc0NDE5NjUsImp0aSI6ImVjMzIxYzFiOWRiMWYyMzFmYjY0ZThjNWYzMjQzNmE2NzljYWRkNTIifQ.K9oeG-nr4GvebJjPfosFQUvyhDzvy-A8nHbsUuq2D6uj_HEvyuj1TEl7NTlO0Zrz_wBVv1liFe2omzcW4qkyctZ5b1DtBL6r-mCnlVq3cjlYYSoM2yeP7oST2v6anGa7GV5qFeVVGEsdr4JnTDP0TjdtrwN_aCczJCE_QhkxJg9DQQlrEObWq-SXEspGKxJEg43VEPgvGfD9EHA2eIf6mwHGWjMRV9XSN35d18F8QseN_mSluY4wsGxOkmgSflPR6e2lTSyyi8ckbjYJtMGeUv6lrCCrTfV09QfyOX_e38A-On6kGtExFtSZoi8c3R3uuAiCUeh2U6ZIwKGsfYfp_w'
      })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('access_token', expect.any(String))
          expect(res.body).toHaveProperty('id', expect.any(Number))
          expect(res.body).toHaveProperty('email', expect.any(String))
          done()
        }
      })
  })

})
