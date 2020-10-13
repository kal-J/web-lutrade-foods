import Joi from 'joi';

const SignupSchema = Joi.object({
  restaurant_name: Joi.string().min(5).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string().min(5).max(30).required(),

  confirm_password: Joi.ref('password'),
})
  .with('email', 'password')
  .with('password', 'confirm_password');

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string().min(5).max(30).required(),
}).with('email', 'password');

//schema.validate({});
// -> { value: {}, error: '"username" is required' }

export { SignupSchema, LoginSchema };
