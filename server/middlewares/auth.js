const { jwtValidator } = require('../helpers/jwt')
const { User, Template } = require('../models')

function authentication(req, res, next) {
  const access_token = req.headers.access_token
  if(access_token) {
    try {
      const payload = jwtValidator(access_token)    
      User.findByPk(payload.id)
      .then(user => {
        if (user) {
          req.user = {id: user.id, email: user.email}
          next()
        } else {
          next({name: 'InvalidJWT', message: ['Invalid JWT']})
        }
      })
      .catch(err => {
        next({message: err})
      })
    } catch (err) {
      next({name: 'InvalidJWT', message: ['Invalid JWT']})
    }
    
  } else {
    next({name: 'Unauthorized', message: ['Please login first']})
  }
}

function authorization(req, res, next) {
  const templateId = +req.params.templateId
  Template.findByPk(templateId)
  .then(template => {
    if (template) {
        if (req.user.id === template.userId) {
          next()
        } else {
          next({name: 'Forbidden', message: ['Access forbidden']})
        }
      
    } else {
      next({name: 'NotFound', message: ['Template with such id not found']})
    }
  })
  .catch(err => {
    next({message: err})
  })
}

module.exports = { authentication, authorization }