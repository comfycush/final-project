const { jwtValidator } = require('../helpers/jwt')
const { User, Template } = require('../models')

function authentication(req, res, next) {
  const access_token = req.headers.access_token
  console.log(req.headers.access_token, `ini access token`)
  if(access_token) {
    try {
      const payload = jwtValidator(access_token)    
      User.findByPk(payload.id)
      .then(user => {
        if (user) {
          req.user = {id: user.id, email: user.email}
          next()
        } else {
          console.log(`line 15 <<<<<<<<<<<<<<<<<<`)
          next({name: 'InvalidJWT', message: ['invalid JWT']})
        }
      })
      .catch(err => {
        next({message: err})
      })
    } catch (err) {
      console.log(err, `ini err dari catch <<<<<<<<<<<`)
      next({name: 'InvalidJWT', message: ['invalid JWT']})
      console.log(`line 24 <<<<<<<<<<<<<<<<<<`)
    }
    
  } else {
    next({name: 'Unauthorized', message: ['please login first']})
  }
}

function authorization(req, res, next) {
  const templateId = +req.params.templateId
  console.log(req.user.id, `ini req user id`)

  Template.findByPk(templateId)
  .then(template => {
    if (template) {
     console.log(template.userId, `ini template userId`)
        if (req.user.id === template.userId) {

          next()
        } else {
          next({name: 'Forbidden', message: ['access forbidden']})
        }
      
    } else {
      next({name: 'NotFound', message: ['template not found']})
    }
  })
  .catch(err => {
    next({message: err})
  })
}

module.exports = { authentication, authorization }