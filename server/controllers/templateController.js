const { Template } = require('../models')

class TemplateController {
    static getHome(req, res, next) {
        const userId = req.user.id
        Template.findAll({ where : { userId: userId }})
        .then( data => {
            res.status(200).json(data)
        })
        .catch(err => next({message: err}))
    }

    static getByTemplateId(req, res, next) {
        const templateId = req.params.templateId
        Template.findByPk(templateId)
        .then( data => {
            if(data) {
                res.status(200).json(data)
            } else {
                next({ name: `NotFound`, message: `Template with such id not found` })
            }
        })
        .catch(err => {
            next({ message: err })
        })
    }

    static deleteTemplate(req, res, next) {
        const templateId = req.params.templateId
        Template.destroy({ where: { id: templateId } })
        .then( (countOfDeletedRows) => {
            if(countOfDeletedRows) {
                res.status(200).json({ message: `Template deleted successfully` })
            } else {
                next({ name: `NotFound`, message: `Template with such id not found` })
            }
        })
        .catch( err => next({ message: err }))
    }

    static createTemplate(req, res, next) {
        let userId = req.user.id
        let { projectTitle, navbar, main, about, service, contact, footer } = req.body
        Template.create({ userId, projectTitle, navbar, main, about, service, contact, footer })
        .then( data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.name === `SequelizeValidationError`) {
                next({ name: `SequelizeValidationError`, message: err.errors })
            } else {
                next({ message: err })
            }
        })
    }

    static updateTemplate(req,res, next) {
        let templateId = req.params.templateId
        let { userId, projectTitle, navbar, main, about, service, contact, footer } = req.body
        
        Template.update({ userId, projectTitle, navbar, main, about, service, contact, footer }, { where : { id:templateId } })
        .then( data => {
            if(data[0]) {
                res.status(200).json({ message: `Template updated successfully` })
            } else {
                next({ name: `NotFound`, message: `Template with such id not found` })
            }
        })
        .catch( err => {
            if(err.name === `SequelizeValidationError`) {
                next({ name: `SequelizeValidationError`, message: err.errors })
            } else {
                next({ message: err })
            }
        })
    }
}

module.exports = TemplateController