const request = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const { Template, User } = require('../models')
const { jwtGenerator, jwtValidator } = require('../helpers/jwt')

let access_token
let registeredUser
let registeredUser2
let templateId
let wrongTemplateId

let dummyData = {
  "userId": null,
  "projectTitle": "Ayam Jago",
  "navbar": {
    "type": 1,
    "logo": "https://i.pinimg.com/736x/3c/ff/4a/3cff4a0b2b76cdb2fddef84b35056c74.jpg",
    "backgroundColor": "#EEEEEE",
    "companyName": "Ayam Jago",
    "companyNameColor": "#FF3F00",
    "navLinks": ["About", "Service", "Contact"],
    "navLinksColor": "#FAFF00"
  },
  "main": {
    "type": 2,
    "image": "https://cdn1-production-images-kly.akamaized.net/lJN-QRjGEGU4JrYoTBaf5etJ8PM=/0x204:1799x1218/673x379/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3195933/original/094731700_1596206149-Ilustrasi_ayam_2.jpg",
    "headline": "Makan Di Ayam Jago",
    "headlineColor": "#FF3F00",
    "subHeadline": "Makan puas hanya di ayam jago!",
    "subHeadlineColor": "#8E2657",
    "backgroundColor": "#EEEEEE"
  },
  "about": {
    "type": 1,
    "image": "https://cdn1-production-images-kly.akamaized.net/lJN-QRjGEGU4JrYoTBaf5etJ8PM=/0x204:1799x1218/673x379/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3195933/original/094731700_1596206149-Ilustrasi_ayam_2.jpg",
    "headline": "About Ayam Jago",
    "headlineColor": "#8E2657",
    "paragraph": "ini about ayam jago",
    "paragraphColor": "#171010",
    "backgroundColor": "#EEEEEE"
  },
  "service": {
    "type": 3,
    "headline": "Service Ayam Jago",
    "headlineColor": "#FF3F00",
    "backgroundColor": "#EEEEEE",
    "cardImage1": "https://img.okezone.com/content/2020/08/21/320/2265466/eksistensi-logo-ayam-di-dunia-bisnis-dari-restoran-hingga-jamu-97G9P2QKv1.png",
    "cardBackgroundColor1": "#FFEEDB",
    "cardTitle1": "Card 1 Ayam",
    "cardTitleColor1": "#171010",
    "cardText1": "Text card ayam 1",
    "cardTextColor1": "#171010",
    "cardImage2": "https://img.okezone.com/content/2020/08/21/320/2265466/eksistensi-logo-ayam-di-dunia-bisnis-dari-restoran-hingga-jamu-97G9P2QKv1.png",
    "cardBackgroundColor2": "#FFEEDB",
    "cardTitle2": "Card 2 Ayam",
    "cardTitleColor2": "#171010",
    "cardText2": "Text card ayam 2",
    "cardTextColor2": "#171010",
    "cardImage3": "https://img.okezone.com/content/2020/08/21/320/2265466/eksistensi-logo-ayam-di-dunia-bisnis-dari-restoran-hingga-jamu-97G9P2QKv1.png",
    "cardBackgroundColor3": "#FFEEDB",
    "cardTitle3": "Card 3 Ayam",
    "cardTitleColor3": "#171010",
    "cardText3": "Text card ayam 3",
    "cardTextColor3": "#171010"
  },
  "contact": {
    "type": 3,
    "headline": "Concact Me",
    "headlineColor": "#FF3F00",
    "email": "ayam@gmail.com",
    "emailColor": "#171010",
    "phone": "02929292",
    "phoneColor": "#171010",
    "address": "jalan ayam",
    "addressColor": "#171010",
    "backgroundColor": "#EEEEEE"
  },
  "footer": {
    "type": 2,
    "backgroundColor": "#EEEEEE",
    "iconColor": "black",
    "facebook": "link fb",
    "instagram": "link ig",
    "twitter": "link tw",
    "linkedin": "link linkedin",
    "youtube": "link youtube"
  }
}

let user_data = {
  email: 'test1@mail.com',
  password: '12345',
}

beforeAll((done) => {
  // login dulu lalu create 1 template
  if (process.env.NODE_ENV === 'test') {
    User.create(user_data)
      .then(user => {
        registeredUser = user
        dummyData.userId = user.id
        return User.findOne({
          where: {
            email: registeredUser.email
          }
        })
      })
      .then(data => {
        let confirmPassword = bcrypt.compare(user_data.password, data.password)
        if (confirmPassword) {
          let payload = {
            id: data.id,
            email: data.email
          }
          access_token = jwtGenerator(payload)
          done()
        } else {
          throw confirmPassword
        }
      })
      .catch(err => {
        done(err)
      })
  }
})

afterAll((done) => {
  User.destroy({ truncate: true })
  .then(() => {
    Template.destroy({ truncate: true })
  })
  .then(() => {
    done()
  })
  .catch(err => {
    done(err)
  })
})

describe('Post, get, update, delete template [SUCCESS CASE]', () => {
  test('Should able to post template', (done) => {
    request(app)
      .post('/template')
      .set('access_token', access_token) // dummy diganti dg access_token beneran
      .send(dummyData)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          templateId = res.body.id
          wrongTemplateId = +templateId + 2
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('id', expect.any(Number))
          expect(res.body).toHaveProperty('userId', expect.any(Number))
          expect(res.body).toHaveProperty('projectTitle', expect.any(String))
          expect(res.body).toHaveProperty('navbar', expect.any(Object))
          expect(res.body).toHaveProperty('main', expect.any(Object))
          expect(res.body).toHaveProperty('about', expect.any(Object))
          expect(res.body).toHaveProperty('service', expect.any(Object))
          expect(res.body).toHaveProperty('contact', expect.any(Object))
          expect(res.body).toHaveProperty('footer', expect.any(Object))
          done()
        }
      })
  })

  test('Should send template based on userId', (done) => {
    request(app)
      .get('/')
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toEqual(expect.any(Array))
          done()
        }
      })
  })

  test('Should change template isDeploy to true', (done) => {
    let isDeploy = { isDeploy: true }
    request(app)
      .patch(`/template/${templateId}`)
      .set('access_token', access_token)
      .send(isDeploy)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toEqual(expect.any(Object))
          expect(res.body.message).toEqual(`Template is successfully deployed`)
          done()
        }
      })
  })

  test('Should send template based on templateId without access_token', (done) => {
    request(app)
      .get(`/${templateId}`)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toEqual(expect.any(Object))
          done()
        }
      })
  })

  test('Should send template based on templateId with access_token', (done) => {
    request(app)
      .get(`/template/${templateId}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toEqual(expect.any(Object))
          done()
        }
      })
  })

  test('Should send updated template based on templateId with access_token', (done) => {
    let putDummyData = { ...dummyData, projectTitle: 'Sapi Lada Hitam' }
    request(app)
      .put(`/template/${templateId}`)
      .set('access_token', access_token)
      .send(putDummyData)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toEqual(expect.any(Object))
          expect(res.body.putData.projectTitle).toEqual('Sapi Lada Hitam')
          done()
        }
      })
  })

  test("Should send message with value 'Template deleted successfully'", (done) => {
    request(app)
      .delete(`/template/${templateId}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Template deleted successfully')
          done()
        }
      })
  })
})


describe('Post, get, update, delete template [ERROR CASE]', () => {
  test("Failed to get template because requested templateId not found", (done) => {
    request(app)
      .get(`/template/${wrongTemplateId}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(404)
          expect(res.body).toEqual(expect.any(Object))
          expect(res.body.errors).toEqual('Template with such id not found')
          done()
        }
      })
  })

  test('Failed to get userId templates because userId in JWT is invalid', (done) => {
    const userInvalidJWT = { ...user_data, email: 'test2@mail.com' }
    let userIdInvalidJWT
    let access_token_invalid
    User.create(userInvalidJWT)
     .then(data => {
      userIdInvalidJWT = data.id + 2
      access_token_invalid = jwtGenerator({
        id: userIdInvalidJWT,
        email: data.email
      })
      request(app)
        .get('/')
        .set('access_token', access_token_invalid)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).toBe(401)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.errors).toContain('Invalid JWT')
            done()
          }
        })
     })
  })

  test('Failed to get userId templates because userId in JWT is not a number', (done) => {
    const userInvalidJWT = { ...user_data, email: 'test6@mail.com' }
    let userIdNotNumber = 'not number'
    let access_token_invalid
    User.create(userInvalidJWT)
     .then(data => {
      access_token_invalid = jwtGenerator({
        id: userIdNotNumber,
        email: data.email
      })
      request(app)
        .get('/')
        .set('access_token', access_token_invalid)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).toBe(500)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.errors).toEqual('invalid input syntax for type integer: "not number"')
            done()
          }
        })
     })
  })

  test("Failed to delete template because wrong templateId", (done) => {
    request(app)
      .delete(`/template/${wrongTemplateId}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(404)
          expect(res.body).toEqual(expect.any(Object))
          expect(res.body.errors).toContain('Template with such id not found')
          done()
        }
      })
  })

  test("Failed to delete template because templateId is not a number", (done) => {
    request(app)
      .delete(`/template/notnumber`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(500)
          expect(res.body).toEqual(expect.any(Object))
          expect(res.body.errors).toEqual('column "nan" does not exist')
          done()
        }
      })
  })

  test("Failed to create template because there is no projectTitle", (done) => {
    let wrongDummyData = { ...dummyData, projectTitle: '' }
    request(app)
      .post('/template')
      .set('access_token', access_token)
      .send(wrongDummyData)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(400)
          expect(res.body).toEqual(expect.any(Object))
          expect(res.body.errors).toContain('projectTitle required')
          done()
        }
      })
  })

  test("Failed to create template because there is no access_token", (done) => {
    request(app)
      .post('/template')
      .send(dummyData)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(401)
          expect(res.body).toEqual(expect.any(Object))
          expect(res.body.errors).toContain('Please login first')
          done()
        }
      })
  })

  test("Failed to create template because there access_token is false", (done) => {
    request(app)
      .post('/template')
      .set('access_token', 'wrong access token')
      .send(dummyData)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(401)
          expect(res.body).toEqual(expect.any(Object))
          expect(res.body.errors).toContain('Invalid JWT')
          done()
        }
      })
  })

  test("Failed to update template because templateId not found", (done) => {
    let putDummyData = { ...dummyData, projectTitle: 'Sapi Lada Hitam' }
    request(app)
      .put(`/template/${wrongTemplateId}`)
      .set('access_token', access_token)
      .send(putDummyData)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(404)
          expect(res.body).toEqual(expect.any(Object))
          expect(res.body.errors).toContain('Template with such id not found')
          done()
        }
      })
  })

  test("Failed to update template becauseprojectTitle is null ", (done) => {
    let putTemplateId
    Template.create(dummyData)
    .then((data) => {
      putTemplateId = data.id
      let putDummyData = { ...dummyData, projectTitle: null }
      request(app)
        .put(`/template/${putTemplateId}`)
        .set('access_token', access_token)
        .send(putDummyData)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).toBe(400)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.errors).toEqual('projectTitle required')
            done()
          }
        })
    })
  })

  test("Failed to fetch template because template has not been deployed", (done) => {
    Template.create(dummyData)
    .then(data => {
      templateId = data.id
      request(app)
      .get(`/${templateId}?ProjectSapi`)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(404)
          expect(res.body).toEqual(expect.any(Object))
          expect(res.body.errors).toContain('Template with such id has not been deployed')
          done()
        }
      })
    })
  })

  test("Failed to fetch deployed template because templateId not found", (done) => {
    Template.create(dummyData)
    .then(data => {
      templateId = data.id
      request(app)
        .get(`/${wrongTemplateId+2}?ProjectSapi`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).toBe(404)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.errors).toContain('Template with such id not found')
            done()
          }
        })
    })
  })

  test('Failed to delete template because user is not authorized', (done) => {
    let templateIdDeleteFailed
    Template.create(dummyData)
    .then((data) => {
      templateIdDeleteFailed = data.id
      const user_data_2 = { ...user_data, email: 'test3@mail.com' }
      return User.create(user_data_2)
    })
    .then((data) => {
      let access_token = jwtGenerator({
        id: data.id,
        email: data.email
      })
      request(app)
        .delete(`/template/${templateIdDeleteFailed}`)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).toBe(403)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.errors).toContain('Access forbidden')
            done()
          }
        })
    })
  })

  test('Failed to get deployed template because templateId is not a number', (done) => {
    let stringTemplateId = 'id'
    request(app)
      .get(`/${stringTemplateId}`)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(500)
          done()
        }
      })
  })
})