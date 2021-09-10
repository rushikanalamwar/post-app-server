const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
    },

    postDescription: {
      type: String,
    },
    comment:[{
      type: mongoose.Schema.Types.ObjectId , ref: 'Comment', autopopulate: { select: "comment" }
    }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

postSchema.index({ "$**": "text" });
// postSchema.plugin(mongoose_fuzzy_searching);
postSchema.plugin(require("mongoose-autopopulate"));
postSchema.plugin(require("./plugins/extraFields/extraFields.plugin"));

module.exports = mongoose.model("Post", postSchema);
