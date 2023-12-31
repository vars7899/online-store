const mongoose = require("mongoose");

const connectDB = async (server) => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Action:\t\tConnection established to ${connection.host}`.green);
    console.log(`Action:\t\tDatabase ${connection.name} connected`.green);
  } catch (err) {
    console.log(`${err}`.red);
    server.close(() => process.exit(1));
  }
};

module.exports = connectDB;
