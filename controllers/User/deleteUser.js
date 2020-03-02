const User = require("../../models/User");

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json({
        message: "User deleted!"
      });
    } else {
      res.status(500).json({
        message: "Server Busy!"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
