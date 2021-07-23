const errHandler = (err, req, res, next) => {
    //receiving:
    //next({name: 'SequelizeValidationError', message: 'email is required'})
    let name = err.name
    let errors = err.message
    switch(name) {
      case 'SequelizeValidationError':
      case 'SequelizeUniqueConstraintError':
        res.status(400).json({errors})
      break
      case 'InvalidJWT':
      case 'Unauthorized':
      case 'EmailPasswordInvalid':
        res.status(401).json({errors})
        break
      case 'Forbidden':
        res.status(403).json({errors})
      case 'NotFound':
        res.status(404).json({errors})
        break      
      default:
        console.log(errors);
        res.status(500).json({errors})
        break
    }
  }
  
  module.exports = errHandler