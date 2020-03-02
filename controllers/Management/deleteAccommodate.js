const Assets = require("../../models/Asset");
const Management = require("../../models/Management");
const RecycleBin = require("../../models/RecycleBin");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys").key;

exports.deleteAccommodate = async (req, res, next) => {
  try {
    const product = await Management.findByIdAndDelete(req.params.id);
    var user = jwt.verify(JSON.parse(req.body.user), key);
    const recycler = await RecycleBin.findOne({ username: user.sign.username });
    const restore = await recycler.mangeToRecycleBin(req.body.accommodation);
    var products = req.body.accommodation.products;
    for (let i = 0; i < products.length; i++) {
      try {
        var asset = await Assets.findOne({
          asset_id: products[i].asset_id
        });
        await asset.UpdateDeductedStock(products[i].stock);
        res.status(200).json({
          message: "Accommodation Deleted!"
        });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
