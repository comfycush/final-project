const axios = require('axios')
const app = require('../app')
const request = require('supertest')

beforeEach(() => {
  jest.clearAllMocks()
})

jest.mock('axios')

describe('Should able to return reply', () => {
  test('Should send a reply for main explanation in string', (done) => {
    const resp = {
      data: {
        "text": "main section?",
        "intents": [
            {
                "id": "3708455829379077",
                "name": "sectionMeaning",
                "confidence": 0.9988
            }
        ],
        "entities": {
            "section:section": [
                {
                    "id": "1052047131998415",
                    "name": "section",
                    "role": "section",
                    "start": 0,
                    "end": 12,
                    "body": "main section",
                    "confidence": 0.993,
                    "entities": [],
                    "value": "main section",
                    "type": "value"
                }
            ]
        },
        "traits": {}
      }
    }
    axios.mockResolvedValue(resp)
    const chat = 'What is main section?'
    
    request(app)
      .post('/chat')
      .send({ chat })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('message', expect.any(String))
          expect(res.body.message).toEqual('Main section is the first thing visitors will see when they visit your website. Putting catchy and interesting image or text in this section will make your visitors stay longer in your website!')
          done()
        }
      })
  })

  test('Should send a reply for main section explanation in string', (done) => {
    const resp = {
      data: {
        "text": "What is navbar??",
        "intents": [
            {
                "id": "3708455829379077",
                "name": "sectionMeaning",
                "confidence": 0.9876
            }
        ],
        "entities": {
            "section:section": [
                {
                    "id": "1052047131998415",
                    "name": "section",
                    "role": "section",
                    "start": 0,
                    "end": 6,
                    "body": "navbar",
                    "confidence": 0.9835,
                    "entities": [],
                    "value": "navbar section",
                    "type": "value"
                }
            ]
        },
        "traits": {}
      }
    }
    axios.mockResolvedValue(resp)
    const chat = 'What is navbar?'
    
    request(app)
      .post('/chat')
      .send({ chat })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('message', expect.any(String))
          expect(res.body.message).toEqual('A navigation bar is a user interface element within a webpage that contains links to other sections of the website. It is most commonly displayed as horizontal list of links at the top of each page.')
          done()
        }
      })
  })

  test('Should send a reply for about section explanation in string', (done) => {
    const resp = {
      data: {
        "text": "What is about section?",
        "intents": [
            {
                "id": "3708455829379077",
                "name": "sectionMeaning",
                "confidence": 0.9876
            }
        ],
        "entities": {
            "section:section": [
                {
                    "id": "1052047131998415",
                    "name": "section",
                    "role": "section",
                    "start": 0,
                    "end": 6,
                    "body": "navbar",
                    "confidence": 0.9835,
                    "entities": [],
                    "value": "about section",
                    "type": "value"
                }
            ]
        },
        "traits": {}
      }
    }
    axios.mockResolvedValue(resp)
    const chat = 'What is about section?'
    
    request(app)
      .post('/chat')
      .send({ chat })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('message', expect.any(String))
          expect(res.body.message).toEqual('This is where you put the introduction of your company. Introduce your company to visitors by putting a simple description text about your company.')
          done()
        }
      })
  })

  test('Should send a reply for service section explanation in string', (done) => {
    const resp = {
      data: {
        "text": "What is service section?",
        "intents": [
            {
                "id": "3708455829379077",
                "name": "sectionMeaning",
                "confidence": 0.9876
            }
        ],
        "entities": {
            "section:section": [
                {
                    "id": "1052047131998415",
                    "name": "section",
                    "role": "section",
                    "start": 0,
                    "end": 6,
                    "body": "navbar",
                    "confidence": 0.9835,
                    "entities": [],
                    "value": "service section",
                    "type": "value"
                }
            ]
        },
        "traits": {}
      }
    }
    axios.mockResolvedValue(resp)
    const chat = 'What is service section?'
    
    request(app)
      .post('/chat')
      .send({ chat })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('message', expect.any(String))
          expect(res.body.message).toEqual('Service section is where you can introduce your products to visitors. Got any products to show? Let visitors to know about your products here!')
          done()
        }
      })
  })

  test('Should send a reply for contact section explanation in string', (done) => {
    const resp = {
      data: {
        "text": "What is contact section?",
        "intents": [
            {
                "id": "3708455829379077",
                "name": "sectionMeaning",
                "confidence": 0.9876
            }
        ],
        "entities": {
            "section:section": [
                {
                    "id": "1052047131998415",
                    "name": "section",
                    "role": "section",
                    "start": 0,
                    "end": 6,
                    "body": "navbar",
                    "confidence": 0.9835,
                    "entities": [],
                    "value": "contact section",
                    "type": "value"
                }
            ]
        },
        "traits": {}
      }
    }
    axios.mockResolvedValue(resp)
    const chat = 'What is contact section?'
    
    request(app)
      .post('/chat')
      .send({ chat })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('message', expect.any(String))
          expect(res.body.message).toEqual('Let your visitors know how to reach you. You can put your company email, phone, or address here.')
          done()
        }
      })
  })

  test('Should send a reply for footer section explanation in string', (done) => {
    const resp = {
      data: {
        "text": "What is footer section?",
        "intents": [
            {
                "id": "3708455829379077",
                "name": "sectionMeaning",
                "confidence": 0.9876
            }
        ],
        "entities": {
            "section:section": [
                {
                    "id": "1052047131998415",
                    "name": "section",
                    "role": "section",
                    "start": 0,
                    "end": 6,
                    "body": "navbar",
                    "confidence": 0.9835,
                    "entities": [],
                    "value": "footer section",
                    "type": "value"
                }
            ]
        },
        "traits": {}
      }
    }
    axios.mockResolvedValue(resp)
    const chat = 'What is footer section?'
    
    request(app)
      .post('/chat')
      .send({ chat })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('message', expect.any(String))
          expect(res.body.message).toEqual('Footer is the bottom part of your website. Commonly, social media links are put here.')
          done()
        }
      })
  })

  test('Should send a default reply', (done) => {
    const resp = {
      data: {}
    }
    axios.mockResolvedValue(resp)
    const chat = 'asdasd asd kajnsfda'
    
    request(app)
      .post('/chat')
      .send({ chat })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('message', expect.any(String))
          expect(res.body.message).toEqual("Ask me something like 'what does navbar mear?' or 'what is footer?'")
          done()
        }
      })
  })
})