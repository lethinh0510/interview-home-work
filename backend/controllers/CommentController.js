const Post = require("../models/post");
const Comment = require("../models/comment");
exports.create = (req, res) => {
  const { body } = req;
  const data = { ...body, owner: req.user.user_id };
  const comment = new Comment(data);
  comment.save((err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      Post.findOneAndUpdate(
        { _id: body.post_id },
        { $push: { comments: result._id } }
      )
        .then(post => {
          if (post) {
            res.json(post);
          } else {
            res.status(404).json({});
          }
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    }
  });
};
exports.update = (req, res) => {
  const { body } = req;
  Comment.updateOne({ _id: req.params.id, owner: req.user.user_id }, body)
    .then(result => {
      res.json({ success: true, result });
    })
    .catch(error => {
      res.status(500).json({ error: err });
    });
};
