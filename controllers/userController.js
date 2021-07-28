const { User } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
const { jwtGenerator } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
// 1035521074618-nkotpceb3p60muu0h5rmf6hn5pe72dtc.apps.googleusercontent.com
// wc0l5yiQ1JsypFOVrZFRsyxM

class UserController {
  static register(req, res, next) {
    let { email, password } = req.body;
    // password = bcrypt.hashSync(password, 10)
    User.create({ email, password })
      .then((data) => {
        res.status(201).json({
          id: data.id,
          email: data.email,
        });
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          let errMsg = err.errors.map((e) => {
            return e.message;
          });
          next({ name: "SequelizeValidationError", message: errMsg });
        } else if (err.name === "SequelizeUniqueConstraintError") {
          let errMsg = err.errors.map((e) => {
            return e.message;
          });
          next({ name: "SequelizeUniqueConstraintError", message: errMsg });
        } else {
          next({ message: err.message });
        }
      });
  }

  static login(req, res, next) {
    let { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((data) => {
        if (data) {
          if (bcrypt.compareSync(password, data.password)) {
            const access_token = jwtGenerator({
              id: data.id,
              email: data.email,
            });
            res
              .status(200)
              .json({ access_token, email: data.email, id: data.id });
          } else {
            next({
              name: `EmailPasswordInvalid`,
              message: [`Invalid email/password`],
            });
          }
        } else {
          next({
            name: `EmailPasswordInvalid`,
            message: [`Invalid email/password`],
          });
        }
      })
      .catch((err) => {
        next({ message: err.message });
      });
  }

  static googleLogin(req, res, next) {
    let payload
    const client = new OAuth2Client(
      "1035521074618-nkotpceb3p60muu0h5rmf6hn5pe72dtc.apps.googleusercontent.com"
    );
    client
      .verifyIdToken({
        idToken: req.body.token,
        audience:
          "1035521074618-nkotpceb3p60muu0h5rmf6hn5pe72dtc.apps.googleusercontent.com",
      })
      .then((ticket) => {
        payload = ticket.getPayload();
        return User.findOne({ where: { email: payload.email } });
      })
      .then((foundUser) => {
        if (foundUser) {
          return foundUser;
        } else {
          return User.create({
            email: payload.email,
            password: "wc0l5yiQ1JsypFOVrZFRsyxM",
          });
        }
      })
      .then((user) => {
        let access_token = jwtGenerator({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({ access_token, id: user.id, email: user.email });
      })
      .catch((err) => {
        next({ message: err.message });
      });
  }
}

module.exports = UserController;
