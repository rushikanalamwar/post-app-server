const express = require("express");
const router = express.Router();
const postController = require('../controllers/postController.js');
const advancedResults = require('../middlewares/advancedResults')
const PostModel = require('../models/postModel.js');


router.get("/",advancedResults(PostModel), postController.getAllPostModel);
router.delete("/", postController.deleteAllPostModel);
router.get("/:id", postController.getAPostModelById);
router.post("/", postController.createAPostModel);
router.put("/:id", postController.updateAPostModel);
router.delete("/:id", postController.deleteAPostModel);
router.post("/search", postController.searchPostModel);
router.post("/export",advancedResults(PostModel), postController.exportAllPostModel);

module.exports = router;
