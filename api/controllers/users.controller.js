User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const environment = require("../config/environment");

// Get users
exports.index = function (req, res) {
  User.get(function (err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: users
    });
  });
};

// New user
exports.new = function (req, res) {
  User.find({ username: req.body.username.trim() }, function (err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }

    if (users && users.length > 0) {
      res.status(400).send({
        status: "error",
        message: req.body.username + " is already taken"
      });
    } else {
      let user = new User();
      user.username = req.body.username ? req.body.username : user.username;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
      }

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.country = req.body.country;
      user.mobile = req.body.mobile;
      user.postalCode = req.body.postalCode;

      user.save(function (err) {
        if (err) {
          res.json(err);
        }

        res.json({
          message: "New user created!",
          data: user
        });

      });
    }
  });
};

// View user info
exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.send(err);
    }

    res.json({
      message: "User details loading..",
      data: user
    });

  });
};

// Update user info
exports.update = function (req, res) {
  User.findByIdAndUpdate(req.params.user_id, req.body, { new: true }, function (
    err,
    user
  ) {
    if (err) {
      res.send(err);
    }

    res.json({
      message: "User info updated",
      data: user
    });

  });
};

// Delete user
exports.delete = function (req, res) {
  User.remove(
    {
      _id: req.params.user_id
    },
    function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json({
        status: "success",
        message: "User deleted"
      });
    }
  );

};

// Authenticate user
exports.authenticate = function (req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      res.send(err);
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // authentication successful
      user.token = jwt.sign({ sub: user._id }, environment.secret);
      delete user.password;
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: user
      });
    } else {
      // authentication failed
      res.status(401).send({
        status: "error",
        message: "User name or password is invalid."
      });
    }
  });

};

// Change user password
exports.changePassword = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.send(err);
    }

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }
    user.save(function (err) {
      if (err) {
        res.json(err);
      }
      res.status(202).send({
        status: "success",
        message: "Password Updated successfully"
      });
    });
  });

};
