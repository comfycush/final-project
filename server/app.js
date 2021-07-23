const express = require('express')
const app = express()
const port = 3000
const UserController = require('./controllers/userController')
const TemplateController = require('./controllers/templateController')
const errHandler = require('./middlewares/errorHandler')
const { authentication, authorization } = require('./middlewares/auth')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/register', UserController.register)
app.post('/login', UserController.login)
app.post('/googleLogin', UserController.googleLogin)

app.get('/:templateId', TemplateController.getByTemplateId)
app.use(authentication)

app.get('/', TemplateController.getHome)
app.get('/template/:templateId', TemplateController.getByTemplateId)
app.post('/template', TemplateController.createTemplate)

app.use('/template/:templateId', authorization)
app.delete('/template/:templateId', TemplateController.deleteTemplate)
app.put('/template/:templateId', TemplateController.updateTemplate)

app.use(errHandler)

app.listen(port, () => `server listen at port ${port}`)
