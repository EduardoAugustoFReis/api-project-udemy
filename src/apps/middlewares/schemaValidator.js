const { Validator } = require("jsonschema");

const v = new Validator();

const schemaValidator = (schema) => (request, response, next) => {
  const result = v.validate(request.body, schema);

  if (!result.valid) {
    const messageError = [];

    for (const item of result.errors) {
      messageError.push(item.message.replace('"', '').replace('"', ''));
    }

    return response.status(401).send({ schemaError: messageError });
  }
  next();
}

module.exports = schemaValidator;
