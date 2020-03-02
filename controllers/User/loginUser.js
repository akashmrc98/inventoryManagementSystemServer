const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys").key;
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    try {
      var auth = await user.authenticate(req.body.password);
      if (auth) {
        const token = jwt.sign(
          {
            sign: {
              email: user.email,
              username: user.username,
              user_id: user.user_id,
              mobile: user.mobile,
              isAdmin: user.isAdmin
            }
          },
          key
        );
        localStorage.setItem("token", token);
        res.status(200).json({
          token: token,
          status: 200
        });
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logOut = async (req, res, next) => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};
