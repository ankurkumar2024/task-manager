const {
  fetchTaskByIdSchema,
  createNewTaskSchema,
  updateExistingTaskSchema,
} = require("../schemas/task.schema");
const { validateJoiSchema } = require("../utils/joi.service");

/**
 * The above code defines validation middleware functions for validating request parameters and body in
 * a task management application.
 * @param req - The `req` parameter represents the HTTP request object, which contains information
 * about the incoming request such as headers, parameters, body, etc.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending the response body.
 * @param next - The `next` parameter is a callback function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used to move to the next
 * middleware function or to the final route handler.
 * @returns In each of the validation middleware functions, if the validation response is truthy
 * (indicating that there are validation errors), a response with status code 400 and the validation
 * response is returned. Otherwise, the next middleware function is called.
 */
const validateGetTaskById = (req, res, next) => {
  const taskId = parseInt(req.params.id);
  const bodyToBeValidated = { id: taskId };
  const validationResponse = validateJoiSchema(
    fetchTaskByIdSchema,
    bodyToBeValidated,
  );
  if (validationResponse) {
    return res.status(400).send(validationResponse);
  }
  next();
};

const validateTaskCreation = (req, res, next) => {
  const bodyToBeValidated = req.body;
  const validationResponse = validateJoiSchema(
    createNewTaskSchema,
    bodyToBeValidated,
  );
  if (validationResponse) {
    return res.status(400).send(validationResponse);
  }
  next();
};

const validateUpdateExistingTask = (req, res, next) => {
  const taskId = parseInt(req.params.id);
  const bodyToBeValidated = { ...req.body, id: taskId };
  const validationResponse = validateJoiSchema(
    updateExistingTaskSchema,
    bodyToBeValidated,
  );
  if (validationResponse) {
    return res.status(400).send(validationResponse);
  }
  next();
};

const deleteExistingTaskById = validateGetTaskById;

module.exports = {
  validateGetTaskById,
  validateTaskCreation,
  validateUpdateExistingTask,
  deleteExistingTaskById,
};
