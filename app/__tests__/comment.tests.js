const assert = require("assert");
const CommentModel = require('../models/commentModel.js'); //imports the {CommentModel} model.

const data = { id: "" };
describe("Creating CommentModel", () => {
    it("creates a CommentModel", (done) => {
        const comment = new CommentModel(data);
        comment.save().then(() => {
            assert(!comment.deleted);
            done();
        });
    });
});

describe("Deleting a CommentModel", () => {
    let comment;

    beforeEach((done) => {
        comment = new CommentModel(data);
        comment.save().then(() => done());
    });

    it("removes a comment using its instance", (done) => {
        comment.remove()
            .then(() => CommentModel.findOne(data))
            .then((comment) => {
                assert(comment === null);
                done();
            });
    });

    it("removes multiple comments", (done) => {
        CommentModel
            .deleteOne(data)
            .then(() => CommentModel.findOne(data))
            .then((comment) => {
                assert(comment === null);
                done();
            });
    });

    it("removes a comment", (done) => {
        CommentModel
            .findOneAndRemove(data)
            .then(() => CommentModel.findOne(data))
            .then((comment) => {
                assert(comment === null);
                done();
            });
    });

    it("removes a comment using id", (done) => {
        CommentModel
            .findByIdAndRemove(data._id)
            // the following code block is repeated again and again
            .then(() => CommentModel.findOne(data))
            .then((comment) => {
                assert(comment === null);
                done();
            });
        // block end
    });
});

describe("Reading CommentModel details", () => {
    beforeEach((done) => {
        comment = new CommentModel(data);
        comment.save().then(() => done());
    });

    it("finds CommentModel", (done) => {
        CommentModel.findOne(data).then((comment) => {
            assert(condition);
            done();
        });
    });
});
