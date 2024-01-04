require("dotenv").config();
require("colors");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const morgan = require("morgan");
const createHttpError = require("http-errors");
const handleError = require("./middleware/handleError");
const routes = require("./routes");
const cloudinary = require("cloudinary").v2;
const http = require("http");
const { Server } = require("socket.io");

const app = express();
// TODO -- add endpoint when deployed
// "http://localhost:5173"
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const PORT = process.env.PORT || 8080;
const BASE = "/api/v1";
let visitorCount = 0;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
// >> Only use the raw bodyParser for webhooks (Important for STRIPE)
app.use((req, res, next) => {
  if (req.originalUrl === "/api/v1/payment/stripe/webhook") express.raw({ type: "*/*" })(req, res, next);
  else express.json()(req, res, next);
});
app.use(morgan("short"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Traffic request
io.on("connection", (socket) => {
  visitorCount++;
  io.emit("updateVisitorCount", visitorCount);
  console.log(visitorCount);

  socket.on("disconnect", () => {
    visitorCount--;
    io.emit("updateVisitorCount", visitorCount);
  });
});

// Routes
app.get("/", (req, res) => res.status(200).json({ success: true, message: "Eccent* Components Server" }));
app.use(`${BASE}/user`, routes.user);
app.use(`${BASE}/category`, routes.category);
app.use(`${BASE}/product`, routes.product);
app.use(`${BASE}/order`, routes.order);
app.use(`${BASE}/payment`, routes.payment);
app.use(`${BASE}/admin`, routes.admin);
app.use(`${BASE}/transaction`, routes.transaction);

// Error
app.use((_, __, next) => next(createHttpError(404, "Requested endpoint not found")));
app.use(handleError);

server.listen(PORT, () => {
  console.log(`\nAction:\t\tServer up on PORT ${PORT}`.green);
  console.log(`Link:\t\t`.blue + `Visit on http://localhost:8080`.blue.underline);
});

connectDB(server);
