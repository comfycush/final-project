const ChatController = require('../controllers/chatController')
const axios = require('axios')
const app = require('../app')
const { request } = require('../app')

jest.mock('axios')

describe('Should able to return reply', () => {
  test('Should send a reply in string', (done) => {
    const reply = "Ask me something like 'what does navbar mear?' or 'what is footer?'"
    const resp = { message: reply}
    axios.get.mockResolvedValue(resp)
    const req = {
      body: 'Hello'
    }
    
    return ChatController.postChat(_, (req, res))
      .then()
  })
})