const { Template } = require("../models");

class TemplateController {
  static getHome(req, res, next) {
    const userId = req.user.id;
    Template.findAll({ where: { userId: userId } })
      .then((data) => {
        res.status(200).json(data);
      })
  }

  static getByTemplateId(req, res, next) {
    const templateId = req.params.templateId;
    Template.findByPk(templateId)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          next({
            name: `NotFound`,
            message: `Template with such id not found`,
          });
        }
      })
  }

  static getTemplateDeployedById(req, res, next) {
    const templateId = req.params.templateId;
    Template.findByPk(templateId)
      .then((data) => {
        if (data) {
          if (data.isDeploy) {
            res.status(200).json(data);
          } else {
            next({
              name: `NotFound`,
              message: `Template with such id has not been deployed`,
            });
          }
        } else {
          next({
            name: `NotFound`,
            message: `Template with such id not found`,
          });
        }
      })
      .catch((err) => {
        next({ message: err });
      });
  }

  static deleteTemplate(req, res, next) {
    const templateId = req.params.templateId;
    Template.destroy({ where: { id: templateId } })
      .then(() => {
        res.status(200).json({ message: `Template deleted successfully` });
      })
  }

  static createTemplate(req, res, next) {
    let userId = req.user.id;
    let { projectTitle, navbar, main, about, service, contact, footer } =
      req.body;
    Template.create({
      userId,
      projectTitle,
      navbar,
      main,
      about,
      service,
      contact,
      footer,
    })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        let errMsg = err.errors.map((e) => {
          return e.message;
        });
        next({ name: `SequelizeValidationError`, message: errMsg });
      });
  }

  static updateTemplate(req, res, next) {
    let templateId = req.params.templateId;
    let {
      userId,
      projectTitle,
      navbar,
      main,
      about,
      service,
      contact,
      footer,
    } = req.body;
    let putData = {
      userId,
      projectTitle,
      navbar,
      main,
      about,
      service,
      contact,
      footer,
    };
    Template.update(putData, { where: { id: templateId } })
      .then((data) => {
        res.status(200).json({ templateId, putData });
      })
      .catch((err) => {
        next({ name: `SequelizeValidationError`, message: err.errors[0].message });
      });
  }

  static changeIsDeploy(req, res, next) {
    let templateId = req.params.templateId;
    let isDeploy = req.body.isDeploy;
    Template.update({ isDeploy }, { where: { id: templateId } })
      .then((data) => {
        res
          .status(200)
          .json({ message: `Template is successfully deployed` });
      })
  }
}

module.exports = TemplateController;
