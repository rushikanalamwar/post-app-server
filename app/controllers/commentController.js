const CommentModel = require('../models/commentModel.js');

const config = require("../config/index");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const logger = require("nirmitee-logger");
const Json2csvParser = require("json2csv").Parser;

const searchCommentModel = asyncHandler(async (req, res, next) => {
    let comment = await CommentModel
        .fuzzySearch(
            { query: req.query.text, prefixOnly: false, minSize: 3 },
            { ...req.body.options }
        )
        .exec();
    res.status(200).json(comment);
});

const getAllCommentModel = asyncHandler(async (req, res, next) => {
    logger.info({
        message: "Sending the advancedResults",
    });
    res.status(200).json(res.advancedResults);
});

const createACommentModel = asyncHandler(async (req, res, next) => {
    logger.info({
        message: "Creating a CommentModel",
    });
    let comment = new CommentModel({
        ...req.body,
    });
    comment = await comment.save();
    logger.info({
        message: "CommentModel created",
    });
    res.status(200).json(comment);
});

const deleteACommentModel = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    let comment = await CommentModel.findOne({ _id: id });
    if (!comment) {
        logger.error({
            message: `CommentModel with ${id} not found`,
        });
        return next(
            new ErrorResponse(
                `CommentModel with ${id} not found`,
                404
            )
        );
    }

    await CommentModel.deleteOne({_id:id});
    comment = await CommentModel.findOne({ _id: id });

    logger.info({
        message: `CommentModel with ${id} deleted`,
    });
    res.json({msg: 'comment deleted'});
});

const deleteAllCommentModel = asyncHandler(async (req, res, next) => {
    await CommentModel.remove();
    res.json({deleted: true});
});

const updateACommentModel = asyncHandler(async (req, res, next) => {
    logger.info({
        message: "Updating a CommentModel",
    });
    const id = req.params.id;

    let comment = await CommentModel.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
    );

    if (!comment) {
        logger.error({
            message: `CommentModel with ${id} not found`,
        });
        return next(
            new ErrorResponse(
                `CommentModel  with ${id}  not found`,
                404
            )
        );
    }

    logger.info({
        message: `CommentModel with ${id} updated`,
        ...req.body,
    });
    res.status(200).json(comment);
});

const getACommentModelById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    let comment = await CommentModel.findOne({ _id: id });

    if (!comment) {
        logger.error({
            message: `CommentModel with ${id} not found`,
        });
        return next(
            new ErrorResponse(
                `CommentModel with ${id} not found`,
                404
            )
        );
    }
    logger.info({
        message:`CommentModel with ${id}  found`,
    });
    res.status(200).json(comment);
});


const exportAllCommentModel = asyncHandler(async (req, res, next) => {
    let data = await CommentModel.find().lean();
    const csvFields = Object.keys(data[0]);
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(data);
    res.set("Content-Disposition", "attachment;filename=authors.csv");
    res.set("Content-Type", "application/octet-stream");
    res.send(csv);
  });

module.exports = {
    searchCommentModel,
    getAllCommentModel,
    createACommentModel,
    deleteACommentModel,
    updateACommentModel,
    getACommentModelById,
    deleteAllCommentModel,
    exportAllCommentModel
}