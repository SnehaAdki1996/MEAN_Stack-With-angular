const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let userNameChecker = userName => {
  if (!userName) {
    return false;
  } else {
    if (userName.length > 3 || userName.length > 15) {
      return true;
    } else {
      return false;
    }
  }
};

let emailChecker = email => {
  if (!email) {
    return false;
  } else {
    if (email.length > 5 || email.length > 30) {
      return true;
    } else {
      return false;
    }
  }
};

let vallidEmailChecker = email => {
  if (!email) {
    return false;
  } else {
    const regExp = new RegExp("^(?=^.{10,30}$)(?=^[A-Za-z0-9])[A-Za-z0-9.]+@[A-Za-z0-9]+.[A-Za-z]{2,}");
    return regExp.test(email);
  }
};

let passwordChecker = password => {
  if (!password) {
    return false;
  } else {
    if (password.length > 5 || password.length > 15) {
      return true;
    } else {
      return false;
    }
  }
};

const passwordValidator = [
  {
    validator: passwordChecker,
    message: "Password should be more than 8 character"
  }
];
const emailVlidators = [
  {
    validator: emailChecker,
    message: "Email should be of 5 character and less than 30"
  },
  {
    validator: vallidEmailChecker,
    message: "must be an vlaid email"
  }
];

const userNameValidator = [
  {
    validator: userNameChecker,
    message: "USer Name should be of more than 3 character"
  }
];
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailVlidators },
  userName: { type: String, required: true, unique: true, lowercase: true, validate: userNameValidator },
  password: { type: String, required: true, unique: true, lowercase: true, validate: passwordValidator }
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

userSchema.methods.compaePassword = password => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
