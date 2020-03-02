const User = require("../../models/User");

exports.viewUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json({
        user: user
      });
    }
  } catch (error) {
    console.log(error);
  }
};
