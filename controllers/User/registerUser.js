const User = require("../../models/User");
const crypto = require("crypto");
const key = require("../../config/keys").key;
const RecycleBin = require("../../models/RecycleBin");
const IdGen = require("../../models/IdGens");

exports.registerUser = async (req, res, next) => {
  try {
    var ids = await IdGen.find();
    ids = ids[0];
    user_id = ids.user + 1;
    await ids.updateUserID(user_id);

    user_id = "alcUser" + user_id;
    var dob = new Date(req.body.dob);
    var year = dob.getFullYear();
    var month = dob.getMonth() + 1;
    var dt = dob.getDate();
    dob = dt + "-" + month + "-" + year;

    var encrypt_key = crypto.createCipher("aes-128-cbc", key);
    var password = encrypt_key.update(req.body.password, "utf8", "hex");
    password = password + encrypt_key.final("hex");

    var recycle = await new RecycleBin({
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      mobile: req.body.mobile
    });

    const user = await new User({
      user_id: user_id,
      first_name: req.body.first_name.toLowerCase(),
      last_name: req.body.last_name.toLowerCase(),
      gender: req.body.gender,
      dob: dob,
      mobile: req.body.mobile,
      address: req.body.address,
      isAdmin: req.body.isAdmin,
      username: req.body.username,
      password: password,
      email: req.body.email.toLowerCase()
    });
    try {
      await user.save();
      try {
        await recycle.save();
        if (user) {
          res.status(200).json({
            message: {
              message: "User Successfully Added",
              status: 200
            }
          });
        }
      } catch (error) {
        console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};
