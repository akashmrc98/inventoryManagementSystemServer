const Asset = require("../../models/Asset");
const Recycle = require("../../models/RecycleBin");
const jwt = require("jsonwebtoken");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

exports.deleteAsset = async (req, res, next) => {
  try {
    var user = jwt.verify(localStorage.getItem("token"), "$msi_amd@98");
    try {
      const recycler = await Recycle.findOne({ username: user.sign.username });
      try {
        if (recycler) {
          const restore = await recycler.assetToRecycleBin(req.body.asset);
          if (restore) {
            const asset = await Asset.findByIdAndDelete(req.params.id);
            res.status(200).json({
              message: "Asset deleted!"
            });
          } else {
            res.status(200).json({
              message: "Server Busy!"
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
