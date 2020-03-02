const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  dob: {
    type: String
  },
  mobile: {
    type: String
  },
  address: {
    type: String
  },
  isAdmin: {
    type: Boolean
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  passwordToken: {
    type: String
  },
  loginToken: {
    type: String
  },
  logs: [
    {
      check_in: {
        type: Date
      },
      check_out: {
        type: Date
      }
    }
  ]
});

const crypto = require("crypto");
const key = require("../config/keys").key;
UserSchema.methods.authenticate = function(password) {
  try {
    var decrypt_key = crypto.createDecipher("aes-128-cbc", key);
    var pass = this.password;
    var password_check = decrypt_key.update(pass, "hex", "utf8");
    password_check = password_check + decrypt_key.final("utf8");
    if (password_check === password) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", UserSchema);
