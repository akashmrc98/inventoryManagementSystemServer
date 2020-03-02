const User = require("../../models/User");

exports.viewUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json({
        users: users
      });
    }
  } catch (error) {
    console.log(error);
  }
};
