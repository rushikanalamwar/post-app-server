const PostModel = require("../models/postModel.js");

const config = require("../config/index");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const logger = require("nirmitee-logger");
const Json2csvParser = require("json2csv").Parser;

const searchPostModel = asyncHandler(async (req, res, next) => {
  let post = await PostModel.fuzzySearch(
    { query: req.query.text, prefixOnly: false, minSize: 3 },
    { ...req.body.options }
  ).exec();
  res.status(200).json(post);
});

const getAllPostModel = asyncHandler(async (req, res, next) => {
  logger.info({
    message: "Sending the advancedResults",
  });
  res.status(200).json(res.advancedResults);
});

const createAPostModel = asyncHandler(async (req, res, next) => {
  logger.info({
    message: "Creating a PostModel",
  });
  let post = new PostModel({
    ...req.body,
  });
  post = await post.save();
  logger.info({
    message: "PostModel created",
  });
  res.status(200).json(post);
});

const deleteAPostModel = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let post = await PostModel.findOne({ _id: id });
  if (!post) {
    logger.error({
      message: `PostModel with ${id} not found`,
    });
    return next(new ErrorResponse(`PostModel with ${id} not found`, 404));
  }

  await PostModel.deleteById(id);
  post = await PostModel.findOne({ _id: id });

  logger.info({
    message: `PostModel with ${id} deleted`,
  });
  res.json(post);
});

const deleteAllPostModel = asyncHandler(async (req, res, next) => {
  await PostModel.remove();
  res.json({ deleted: true });
});

const updateAPostModel = asyncHandler(async (req, res, next) => {
  logger.info({
    message: "Updating a PostModel",
  });
  const id = req.params.id;

  let post = await PostModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!post) {
    logger.error({
      message: `PostModel with ${id} not found`,
    });
    return next(new ErrorResponse(`PostModel  with ${id}  not found`, 404));
  }

  logger.info({
    message: `PostModel with ${id} updated`,
    ...req.body,
  });
  res.status(200).json(post);
});

const getAPostModelById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  let post = await PostModel.findOne({ _id: id });

  if (!post) {
    logger.error({
      message: `PostModel with ${id} not found`,
    });
    return next(new ErrorResponse(`PostModel with ${id} not found`, 404));
  }
  logger.info({
    message: `PostModel with ${id}  found`,
  });
  res.status(200).json(post);
});

const exportAllPostModel = asyncHandler(async (req, res, next) => {
  let data = await PostModel.find().lean();
  const csvFields = Object.keys(data[0]);
  const json2csvParser = new Json2csvParser({ csvFields });
  const csv = json2csvParser.parse(data);
  res.set("Content-Disposition", "attachment;filename=authors.csv");
  res.set("Content-Type", "application/octet-stream");
  res.send(csv);
});

module.exports = {
  searchPostModel,
  getAllPostModel,
  createAPostModel,
  deleteAPostModel,
  updateAPostModel,
  getAPostModelById,
  deleteAllPostModel,
  exportAllPostModel,
};
