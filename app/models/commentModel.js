const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    comment: {
      type: String,
    },

    comments: [
      {
        type: Object,
        ref: this
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

commentSchema.index({ "$**": "text" });
// commentSchema.plugin(mongoose_fuzzy_searching);
commentSchema.plugin(require("mongoose-autopopulate"));
commentSchema.plugin(require("./plugins/extraFields/extraFields.plugin"));

module.exports = mongoose.model("Comment", commentSchema);
