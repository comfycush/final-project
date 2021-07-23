const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

afterAll((done) => {
  User.destroy()
  .then(() => {
    done()
  })
  .catch(err => {
    done(err)
  })
})

describe('User Google Login [SUCCESS CASE]', () => {
  test('Should send an object with key: access_token, id, email', (done) => {
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

describe('User Google Login [ERROR CASE]', () => {
  test('Failed because')
})