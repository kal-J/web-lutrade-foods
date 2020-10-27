import Joi from 'joi';

const schemaStep1 = Joi.object({
  meal_item_name: Joi.string().max(30).required(),
  meal_item_price: Joi.number().required(),
})
  .with('meal_item_name', 'meal_item_price')
  .options({ allowUnknown: true });

const schemaStep2 = Joi.object({
  meal_addons: Joi.array().items(Joi.string().max(30)),
}).options({ allowUnknown: true });

const schemaStep3 = Joi.object({
  meal_item_description: Joi.string().required(),
}).options({ allowUnknown: true });

//schema.validate({});
// -> { value: {}, error: '"username" is required' }

export { schemaStep1, schemaStep2, schemaStep3 };
