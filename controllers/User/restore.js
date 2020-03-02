const Recycle = require("../../models/RecycleBin");
const Assets = require("../../models/Asset");

exports.restoreAsset = async (req, res, next) => {
  try {
    const user = await Recycle.findOne({ username: req.body.id });
    try {
      await user.RestoreAssets(req.body.restore[0].asset_id);
      const asset = {
        id: req.body.restore[0]._id,
        asset_id: req.body.restore[0].asset_id,
        product_name: req.body.restore[0].product_name.toLowerCase(),
        category: req.body.restore[0].category.toLowerCase(),
        vendor: req.body.restore[0].vendor.toLowerCase(),
        vendor_contact_no: req.body.restore[0].vendor_contact_no,
        vendor_address: req.body.restore[0].vendor_address.toLowerCase(),
        summary: req.body.restore[0].summary.toLowerCase(),
        comments: req.body.restore[0].comments.toLowerCase(),
        notes: req.body.restore[0].notes.toLowerCase(),
        product_quantity: parseInt(req.body.restore[0].product_quantity),
        total_price: parseFloat(req.body.restore[0].total_price)
      };
      try {
        const assets = await new Assets(asset);
        try {
          await assets.save();
          if (assets) {
            res.status(200).json({
              message: "User deleted!"
            });
          } else {
            res.status(500).json({
              message: "Server Busy!"
            });
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
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
