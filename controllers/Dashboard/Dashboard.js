const Asset = require("../../models/Asset");
const Management = require("../../models/Management");
const User = require("../../models/User");

exports.dashBoard = async (req, res, next) => {
  try {
    const total_assets = await Asset.countDocuments();
    const total_accommodations = await Management.countDocuments();
    const assets = await Asset.find();
    const total_users = await User.countDocuments();
    var total_products = 0;
    for (let i = 0; i < total_assets; i++) {
      total_products = total_products + assets[i].product.length;
    }
    var total_services = 0;
    for (let i = 0; i < total_assets; i++) {
      total_services = total_services + assets[i].services.length;
    }

    var returned_assets = await Management.find();
    returned_assets = returned_assets.filter(assets => {
      return assets.return_on !== null;
    });
    returned_assets = returned_assets.length;

    var pending_assets = await Management.find();
    pending_assets = pending_assets.filter(assets => {
      return assets.return_on === null;
    });
    pending_assets = pending_assets.length;

    var damaged_assets = await Management.find();
    damaged_assets = damaged_assets.filter(assets => {
      return assets.condition === "Damaged";
    });
    damaged_assets = damaged_assets.length;

    var dashboard = {
      total_assets: total_assets,
      total_accommodations: total_accommodations,
      total_products: total_products,
      total_services: total_services,
      returned_assets: returned_assets,
      pending_assets: pending_assets,
      damaged_assets: damaged_assets,
      total_users: total_users
    };

    res.status(200).json({
      dashboard: dashboard
    });
  } catch (error) {
    console.log(error);
  }
};
