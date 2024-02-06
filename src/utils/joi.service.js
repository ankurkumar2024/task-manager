/**
 * The function `validateJoiSchema` validates a given schema against a body and returns an error
 * message if there is a validation error.
 * @param schema - The "schema" parameter is a Joi schema object that defines the validation rules for
 * the "body" parameter. The Joi schema object is used to validate the structure and data types of the
 * "body" object.
 * @param body - The `body` parameter is an object that represents the data that needs to be validated
 * against the `schema`. It typically contains the request payload or data that needs to be validated.
 * @returns The function `validateJoiSchema` returns an object with a `message` property if there is an
 * error in validating the `body` against the `schema`. Otherwise, it returns `0`.
 */
const validateJoiSchema = (schema, body) => {
  const { error } = schema.validate(body);
  if (error) {
    return { message: error.details[0].message };
  }
  return 0;
};
module.exports = {
  validateJoiSchema,
};
