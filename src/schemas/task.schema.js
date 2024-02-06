const Joi = require("joi");

const fetchTaskByIdBody = {
  id: Joi.number().required().messages({
    "number.base": "The id passed in url must be a valid number",
  }),
};

const createNewTaskBody = {
  title: Joi.string().max(1000).required(),
  description: Joi.string().max(1000).required(),
  completed: Joi.any()
    .custom((value, helpers) => {
      if (typeof value !== "boolean" || (value !== true && value !== false)) {
        return helpers.error("boolean.invalid");
      }
      return value;
    })
    .required()
    .messages({
      "any.only": "The completed field must be true or false as a boolean",
      "boolean.invalid": "The completed field must be a boolean value",
    }),
};

const fetchTaskByIdSchema = Joi.object(fetchTaskByIdBody);

const createNewTaskSchema = Joi.object(createNewTaskBody);

const updateExistingTaskSchema = Joi.object({
  ...fetchTaskByIdBody,
  ...createNewTaskBody,
});

module.exports = {
  fetchTaskByIdSchema,
  createNewTaskSchema,
  updateExistingTaskSchema,
};
