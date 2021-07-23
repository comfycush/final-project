const request = require('supertest')
const app = require('../app')
const { Template } = require('../models')

let access_token

let dummyData = {
  "userId": 1,
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

beforeCreate((done) => {
  // login dulu lalu create 1 template
})

describe('Post, get, update, delete template [SUCCESS CASE]', () => {
  test('Should able to post template', (done) => {
    request(app)
      .post('/template')
      .set('access_token', 'access_token_dummy') // dummy diganti dg access_token beneran
      .send(dummyData)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('templateId', expect.any(Number))
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

  test('Should send template based on templateId', (done) => {
    request(app)
      .get()
  })
})
