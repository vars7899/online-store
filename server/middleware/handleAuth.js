const createHttpError = require("http-errors");
const User = require("../models").User;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const handleAuth = async (req, _, next) => {
  try {
    const { token } = req.cookies;
    // Check if cookie exist
    if (!token) {
      throw createHttpError(401, "Unauthorized user, no token available");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // Check if the token is valid or not
    if (!mongoose.isValidObjectId(decode._id)) {
      throw createHttpError(400, "Invalid token");
    }
    const userExist = await User.findById(decode._id);
    // If user does not exist
    if (!userExist) {
      throw createHttpError(401, "Unauthorized user, invalid token");
    }
    req.user = userExist;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = handleAuth;
