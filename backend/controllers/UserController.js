const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.register = (req, res) => {
  const email = req.body.email;
  User.findOne({ email: email }).then(user => {
    if (user == null) {
      const user = new User(req.body);
      user.save((err, result) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          delete result.password;
          res.json({ user: result });
        }
      });
    } else {
      res.status(400).json({ message: "Email has been used" });
    }
  });
};
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(user => {
    if (user == null) {
      res.status(400).json({
        message: "Username and Password are incorrect"
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          const token = jwt.sign(
            {
              email: email,
              user_id: user._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "24h"
            }
          );
          user.password = "";
          res.json({
            user: user,
            token: token
          });
        } else {
          return res
            .status(400)
            .json({ message: "Username and Password are incorrect" });
        }
      });
    }
  });
};
exports.profile = (req, res) => {
  User.findOne({ _id: req.user.user_id }).select('-password')
    .then(user => {
      if (user !== null) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Email has been used" });
      }
    })
};

exports.update = (req, res) => {
	User.findOneAndUpdate({ _id: req.user.user_id }, res.body)
	  .then(user => {
		if (user !== null) {
		  res.json(user);
		} else {
		  res.status(400).json({ message: "Not Found" });
		}
	  })
  };
  