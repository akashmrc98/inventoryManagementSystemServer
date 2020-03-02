const User = require("../models/User");
const Assets = require("../models/Asset");
const IdGen = require("../models/IdGens");
const RecycleBin = require("../models/RecycleBin");

const admin_user = require("./data").admin;
const staff_user = require("./data").staff;
const assets = require("./data").assets;

exports.loadData = async () => {
  try {
    const admin = await User.find();

    if (admin.length <= 0) {
      const idGens = await new IdGen({
        asset: 0,
        product: 0,
        service: 0,
        user: 0,
        accommodate: 0
      });
      idGens.save();
      const staff = await new User(staff_user);
      const user = await new User(admin_user);
      var recycle = await new RecycleBin({
        username: admin_user.username,
        email: admin_user.email.toLowerCase(),
        mobile: admin_user.mobile
      });
      await recycle.save();
      await staff.save();
      await user.save();
      for (var i = 0; i < assets.length; i++) {
        try {
          const asset = await new Assets(assets[i]);
          await asset.save();
        } catch (error) {
          console.log(error);
        }
      }
      console.log("Data load successful!");
    }
  } catch (error) {
    console.log(error);
  }
};
