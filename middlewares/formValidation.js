const { Joi } = require("express-validation");

const regex_sid = /^[A-z][0-9]{8}$/;

module.exports.login = {
  body: Joi.object({
    sid: Joi.string().regex(regex_sid).required(),
    password: Joi.string().required(),
  }),
};

module.exports.register = {
  body: Joi.object({
    sid: Joi.string().regex(regex_sid).required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
