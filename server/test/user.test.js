const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

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

  
})








describe('User Google Login [SUCCESS CASE]', () => {
  test.skip('Should send an object with key: access_token, id, email', (done) => {
    request(app)
      .post('/login')
      .send('google_id_token_dummy') // dummy harus diganti dengan id_token yg dikirim google
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('access_token', expect.any(String))
          expect(res.body).toHaveProperty('email', expect.any(String))
          expect(res.body).toHaveProperty('id', expect.any(Number))
          done()
        }
      })
  })
})

// describe('User Google Login [ERROR CASE]', () => {
//   test.skip('Failed because')
// })