//Required libs
const express = require("express");
const cors = require("cors");
const logger = require("nirmitee-logger");
const correlationIdHelper = require("nirmitee-express-correlation-id-helper");
const postRouter = require("./app/routes/post.routes");

const commentRouter = require("./app/routes/comment.routes");
const replaceRouter = null;
//custom middlewears
const errorHandler = require("./app/middlewares/error");

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  logger.info({
    path: req.path,
    body: req.body,
    query: req.query,
    params: req.params,
  });
  next();
});

app.get("/health", async (req, res) => {
  logger.info({
    message: "API is up",
  });
  res.json({ message: "UP" });
});

app.use("/api/v1/post", postRouter);

app.use("/api/v1/comment", commentRouter);
const replaceRouterPath = null;

app.use(errorHandler);

app.use(function(req, res, next) {
  res.status(404).json({
    success: false,
    message: "Unable to find the requested resource",
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});

logger.setContext("Order Service");

module.exports = app;
