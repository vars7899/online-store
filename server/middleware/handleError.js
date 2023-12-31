const isHttpError = require("http-errors").isHttpError;

const handleError = (error, _, res, next) => {
  let statusCode = 500;
  let errorMessage = error.message || "OOPS!!!, Something went wrong";

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};

module.exports = handleError;
