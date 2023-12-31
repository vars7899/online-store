const createHttpError = require("http-errors");
const mongoose = require("mongoose");

const checkForValidObjectId = (givenId, errMessageKeyWord) => {
  if (!givenId || !mongoose.isValidObjectId(givenId)) {
    throw createHttpError(
      404,
      `The server was unable to process the request because the provided ${errMessageKeyWord} information was either missing or incorrect. Please try again.`
    );
  }
};

module.exports = checkForValidObjectId;
