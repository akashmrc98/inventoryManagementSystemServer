const jwt = require("jsonwebtoken");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const User = require("../models/User");

exports.isAuth = async (req, res, next) => {
  try {
    var localToken = jwt.verify(localStorage.getItem("token"), "$msi_amd@98");
    const user = await User.findOne({ username: localToken.sign.username });
    if (user) {
      next();
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};
