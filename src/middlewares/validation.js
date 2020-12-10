const Joi = require("joi");

const cpfRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

const userSignUpSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  cpf: Joi.string().pattern(cpfRegex).required().messages({
    "string.pattern.base": "formato de CPF invalido",
  }),
  password: Joi.string().min(2).max(30).required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirmacao de senha diferente",
  }),
  ticket: Joi.string().required()
});

const userSignInSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).max(30).required().messages({
    "string.base": `Tem que ser texto`,
    "string.min": "Senha tem que ser maior que 2 carc",
  }),
});

const validateSignup = (req, res, next) => {
  if (userSignUpSchema.validate(req.body).error)
    return res
      .status(422)
      .send(userSignUpSchema.validate(req.body).error.message);

  next();
};

const validateSignin = (req, res, next) => {
  if (userSignInSchema.validate(req.body).error)
    return res
      .status(422)
      .send(userSignInSchema.validate(req.body).error.message);

  next();
};

module.exports = { validateSignup, validateSignin };
