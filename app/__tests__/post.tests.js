const assert = require("assert");
const PostModel = require('../models/postModel.js'); //imports the {PostModel} model.

const data = { id: "" };
describe("Creating PostModel", () => {
    it("creates a PostModel", (done) => {
        const post = new PostModel(data);
        post.save().then(() => {
            assert(!post.deleted);
            done();
        });
    });
});

describe("Deleting a PostModel", () => {
    let post;

    beforeEach((done) => {
        post = new PostModel(data);
        post.save().then(() => done());
    });

    it("removes a post using its instance", (done) => {
        post.remove()
            .then(() => PostModel.findOne(data))
            .then((post) => {
                assert(post === null);
                done();
            });
    });

    it("removes multiple posts", (done) => {
        PostModel
            .deleteOne(data)
            .then(() => PostModel.findOne(data))
            .then((post) => {
                assert(post === null);
                done();
            });
    });

    it("removes a post", (done) => {
        PostModel
            .findOneAndRemove(data)
            .then(() => PostModel.findOne(data))
            .then((post) => {
                assert(post === null);
                done();
            });
    });

    it("removes a post using id", (done) => {
        PostModel
            .findByIdAndRemove(data._id)
            // the following code block is repeated again and again
            .then(() => PostModel.findOne(data))
            .then((post) => {
                assert(post === null);
                done();
            });
        // block end
    });
});

describe("Reading PostModel details", () => {
    beforeEach((done) => {
        post = new PostModel(data);
        post.save().then(() => done());
    });

    it("finds PostModel", (done) => {
        PostModel.findOne(data).then((post) => {
            assert(condition);
            done();
        });
    });
});
