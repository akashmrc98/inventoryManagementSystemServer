const Management = require("../../models/Management");
const Asset = require("../../models/Asset");
const IdGen = require("../../models/IdGens");

exports.addAccommodate = async (req, res, next) => {
  try {
    var ids = await IdGen.find();
    ids = ids[0];
    ticket = ids.accommodate + 1;
    await ids.UpdateAccommodateID(ticket);
    ticket = "alcAccommodation" + ticket;

    console.log(req.body);

    var bought_on = new Date(req.body.Deducted.user.bought_on);
    var year = bought_on.getFullYear();
    var month = bought_on.getMonth() + 1;
    var dt = bought_on.getDate();
    bought_on = dt + "-" + month + "-" + year;
    try {
      const accommodate = await new Management({
        ticket_no: ticket,
        purpose: req.body.Deducted.user.purpose,
        in_charge: req.body.Deducted.user.in_charge,
        in_charge_no: req.body.Deducted.user.in_charge_no,
        bought_on: bought_on,
        return_on: null
      });
      try {
        accommodate.save();
        setTimeout(async () => {
          try {
            const product = await Management.findOne({
              ticket_no: ticket
            });

            for (let i = 0; i < req.body.Deducted.checked.length; i++) {
              try {
                var ProductsToCart = await Asset.findOne({
                  asset_id: req.body.Deducted.checked[i]
                });
                var product_id = ProductsToCart.asset_id;
                var product_name = ProductsToCart.product_name;
                try {
                  const avl_stock = await ProductsToCart.deductStock(
                    req.body.Deducted.stock[i]
                  );
                  if (avl_stock) {
                    try {
                      const message = await product.addToCart(
                        product_id,
                        product_name,
                        req.body.Deducted.stock[i]
                      );

                      if (message) {
                        res.status(200).json({
                          message: "Product added to cart"
                        });
                      } else {
                        res.status(400).json({
                          message: "Bad Request!"
                        });
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    res.status(200).json({
                      message: "Stock Unavailable!"
                    });
                  }
                } catch (error) {
                  console.log(error);
                }
              } catch (error) {
                console.log(error);
              }
            }
          } catch (error) {
            res.status(400).json({
              status: 400,
              message: "Bad Request!"
            });
          }
        }, 1000);
      } catch (error) {
        res.json({
          status: 422,
          message: "Invalid Input or fill all empty fields!"
        });
      }
    } catch (error) {
      res.json({
        status: 422,
        message: "Invalid Input or fill all empty fields!"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Bad Request!"
    });
  }
};
