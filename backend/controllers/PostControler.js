const Post = require("../models/post");
exports.create = (req, res) => {
  const data = {
    ...req.body,
    owner: req.user.user_id
  };
  const post = new Post(data);
  post.save((err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.json({ success: true, result: result });
    }
  });
};
exports.getAll = (req, res) => {
  const page = req.query.page;
  const q = req.query.query;
  const tag = req.query.tag;
  let query = {};
  if (tag) {
    query = {
      tags: tag
    };
  }
  if (q) {
    query = {
      ...query,
      $text: { $search: q }
    };
  }

  let options = {
    page: page,
    limit: 5,
    populate: [
      {path:'owner', select:'-password'},
      {
        path: "comments",
        model: "Comment",
        populate: {
          path: "owner",
          model: "User",
          select:'-password'
        }
      }
    ]
  };

  Post.paginate(query, options, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  });
};
exports.deleteAll = (req, res) => {
  Post.remove({}, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  });
};
exports.get = (req, res) => {
  const id = req.params.id;
  Post.findOne({ _id: id })
    .populate("owner", '-password')
    .populate("comments")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "owner",
        model: "User",
        select:'-password'
      }
    })
    .exec((error, post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({});
      }
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Post.updateOne({ _id: id, owner: req.user.user_id }, data)
    .then(result => {
      res.json({ success: true, result: result });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Post.delete({ _id: id, owner: req.user.user_id })
    .then(result => {
      res.json({ success: true, result: result });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
