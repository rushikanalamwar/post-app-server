const express = require("express");
const router = express.Router();
const commentController = require('../controllers/commentController.js');
const advancedResults = require('../middlewares/advancedResults')
const CommentModel = require('../models/commentModel.js');


router.get("/",advancedResults(CommentModel), commentController.getAllCommentModel);
router.delete("/", commentController.deleteAllCommentModel);
router.get("/:id", commentController.getACommentModelById);
router.post("/", commentController.createACommentModel);
router.put("/:id", commentController.updateACommentModel);
router.delete("/:id", commentController.deleteACommentModel);
router.post("/search", commentController.searchCommentModel);
router.post("/export",advancedResults(CommentModel), commentController.exportAllCommentModel);

module.exports = router;
