const User = require("../models/user");

module.exports = router => {
  router.post("/register", (req, res) => {
    if (!req.body.email) {
      res.json({ success: false, message: "You must provide E-mail" });
    } else {
      if (!req.body.userName) {
        res.json({ success: false, message: "You must provide User Name" });
      } else {
        if (!req.body.password) {
          res.json({ success: false, message: "You must provide User Password" });
        } else {
          let user = new User({
            email: req.body.email.toLowerCase(),
            userName: req.body.userName.toLowerCase(),
            password: req.body.password
          });
          user.save(err => {
            if (err) {
              if (err.code == 11000) {
                res.json({ success: false, message: "Email or user Name already exist" });
              } else {
                res.json({ success: false, message: "err while creation User" + err });
              }
            } else {
              if (err != null) {
                if (err.errors.email) {
                  res.json({ success: false, message: err.errors.email.message });
                } else {
                  if (err.errors.userName) {
                    res.json({ success: false, messagee: err.errors.userName.message });
                  } else {
                    if (err.errors.password) {
                      res.json({ success: false, message: err.errors.password.message });
                    } else {
                      res.json({ success: true, message: "User Created Successfully" });
                    }
                  }
                }
              } else {
                res.json({ success: true, message: "User Created Successfully" });
              }
            }
          });
        }
      }
    }
  });

  router.get("/checkEmail/:email", (req, res) => {
    // Check if email was provided in paramaters
    if (!req.params.email) {
      res.json({ success: false, message: "E-mail was not provided" }); // Return error
    } else {
      // Search for user's e-mail in database;
      User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's e-mail is taken
          if (user) {
            res.json({ success: false, message: "E-mail is already taken" }); // Return as taken e-mail
          } else {
            res.json({ success: true, message: "E-mail is available" }); // Return as available e-mail
          }
        }
      });
    }
  });
  router.get("/checkUsername/:username", (req, res) => {
    // Check if username was provided in paramaters
    if (!req.params.username) {
      res.json({ success: false, message: "Username was not provided" }); // Return error
    } else {
      // Look for username in database
      User.findOne({ username: req.params.username }, (err, user) => {
        // Check if connection error was found
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's username was found
          if (user) {
            res.json({ success: false, message: "Username is already taken" }); // Return as taken username
          } else {
            res.json({ success: true, message: "Username is available" }); // Return as vailable username
          }
        }
      });
    }
  });
  return router;
};
