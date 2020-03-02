const User = require("../../models/User");

exports.editUser = async (req, res, next) => {
  try {
    var dob = new Date(req.body.dob);
    var year = dob.getFullYear();
    var month = dob.getMonth() + 1;
    var dt = dob.getDate();
    dob = dt + "-" + month + "-" + year;
    const update = {
      first_name: req.body.first_name.toLowerCase(),
      last_name: req.body.last_name.toLowerCase(),
      gender: req.body.gender,
      dob: dob,
      mobile: req.body.mobile,
      address: req.body.address,
      isAdmin: req.body.isAdmin,
      username: req.body.username,
      email: req.body.email.toLowerCase()
    };
    const user = await User.findByIdAndUpdate(req.params.id, update);
    if (user) {
      res.status(200).json({
        message: {
          message: "User Details Successfully Updated",
          status: 200
        }
      });
    }
  } catch (error) {
    console.log(error._message);
    res.status(200).json({
      message: {
        message: error._message,
        status: 400
      }
    });
  }
};
