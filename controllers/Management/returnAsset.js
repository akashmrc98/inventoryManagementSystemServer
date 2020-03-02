const Management = require("../../models/Management");
const Assets = require("../../models/Asset");

exports.returnAsset = async (req, res, next) => {
  try {
    const product = await Management.findById(req.params.id);
    try {
      for (let i = 0; i < product.products.length; i++) {
        const asset = await Assets.findOne({
          asset_id: product.products[i].product_id
        });
        await asset.UpdateDeductedStock(product.products[i].stock);
        await product.UpdateDeductedStock(
          product.products[i].product_id,
          product.products[i].stock
        );
      }
      const return_info = await product.returnAsset(req.body.AssetInfo);
      res.status(200).json({
        status: 200,
        message: "Asset Returned!"
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Internal Server Issue!"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Issue!"
    });
  }
};

exports.returnSingleAsset = async (req, res, next) => {
  try {
    const product = await Management.findById(req.params.id);
    var asset_ids = req.body.productId;
    var stock = req.body.stock;
    try {
      for (let i = 0; i < asset_ids.length; i++) {
        const asset = await Assets.findOne({
          asset_id: asset_ids[i]
        });
        const message = await product.UpdateDeductedStock(
          asset_ids[i],
          stock[i]
        );
        console.log(message);
        if (message !== false) {
          await asset.UpdateDeductedStock(stock[i]);
          res.status(200).json({
            status: 200,
            message: "Asset Returned!"
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Invalid stock selection!"
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Internal Server Issue!"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Issue!"
    });
  }
};
