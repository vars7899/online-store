const createHttpError = require("http-errors");

const handleAdmin = (req, _, next) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Unauthorized user, no token available");
    }
    if (!req.user.role || req.user.role !== "admin") {
      throw createHttpError(403, "Access denied, Unable to process the request");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = handleAdmin;
