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
  return router;
};
