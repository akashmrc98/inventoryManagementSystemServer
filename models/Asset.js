const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IdGen = require("./IdGens");

const AssetsSchema = new Schema({
  asset_id: {
    type: String,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  vendor: {
    type: String
  },
  vendor_contact_no: {
    type: String
  },
  vendor_address: {
    type: String
  },
  summary: {
    type: String
  },
  comments: {
    type: String
  },
  notes: {
    type: String
  },
  product_quantity: {
    type: Number,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  time_stamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  product: [
    {
      product_id: {
        type: String
      },
      purchased_date: {
        type: String
      },
      warranty_period: {
        type: String
      },
      model_no: {
        type: String
      },
      serial_no: {
        type: String
      },
      unit_price: {
        type: Number
      }
    }
  ],
  services: [
    {
      service_id: {
        type: String
      },
      serviced_by: {
        type: String
      },
      serviced_on: {
        type: String
      },
      service_no: {
        type: String
      },
      address: {
        type: String
      },
      notes: {
        type: String
      },
      cost: {
        type: Number
      }
    }
  ]
});

AssetsSchema.methods.addService = function(
  service_id,
  serviced_by,
  serviced_on_date,
  service_no,
  address,
  notes,
  cost
) {
  var services = this.services;
  var serviced_on = new Date(serviced_on_date);
  var year = serviced_on.getFullYear();
  var month = serviced_on.getMonth() + 1;
  var dt = serviced_on.getDate();
  serviced_on = dt + "-" + month + "-" + year;
  services.push({
    service_id: service_id,
    serviced_by: serviced_by,
    serviced_on: serviced_on,
    service_no: service_no,
    address: address,
    notes: notes,
    cost: cost
  });
  this.services = services;
  return this.save();
};

AssetsSchema.methods.editService = function(service_id, service) {
  try {
    var services = this.services;
    var index = services.findIndex(pro => {
      return pro._id == service_id;
    });
    const serviced_by = service.serviced_by.toLowerCase();
    const serviced_on = service.serviced_on.toLowerCase();
    const service_no = service.service_no.toLowerCase();
    const address = service.address.toLowerCase();
    const notes = service.notes.toLowerCase();
    const cost = parseFloat(service.cost);

    var oldData = services[index];

    this.services[index] = {
      _id: oldData._id,
      service_id: oldData.service_id,
      serviced_by: serviced_by,
      serviced_on: serviced_on,
      service_no: service_no,
      address: address,
      notes: notes,
      cost: cost
    };
    return this.save();
  } catch (error) {
    console.log(error);
  }
};

AssetsSchema.methods.snapShotService = function(service_id) {
  try {
    var services = this.services;
    services = services.filter(arrProduct => {
      return arrProduct._id == service_id;
    });
    services = services[0];
    return services;
  } catch (error) {
    console.log(error);
  }
};

AssetsSchema.methods.deleteService = function(service_id) {
  try {
    var services = this.services;
    services = services.filter(arrProduct => {
      return arrProduct._id != service_id;
    });
    console.log(services);
    this.services = services;
    return this.save();
  } catch (error) {
    console.log("error");
  }
};

AssetsSchema.methods.deductStock = function(stock) {
  if (this.product_quantity > 0) {
    var qnt = this.product_quantity - stock;
    if (qnt >= 0) {
      this.product_quantity = qnt;
      return this.save();
    } else {
      return false;
    }
  } else {
    return false;
  }
};

AssetsSchema.methods.UpdateDeductedStock = function(stock) {
  var currentTotal = Number(this.product_quantity) + Number(stock);
  this.product_quantity = currentTotal;
  return this.save();
};

AssetsSchema.methods.deleteProduct = function(product_id) {
  try {
    var products = this.product;
    products = products.filter(arrProduct => {
      return arrProduct._id != product_id;
    });
    this.product = products;
    return this.save();
  } catch (error) {
    console.log("error");
  }
};

AssetsSchema.methods.snapShotProduct = function(product_id) {
  try {
    var products = this.product;
    products = products.filter(arrProduct => {
      return arrProduct._id == product_id;
    });
    products = products[0];
    return products;
  } catch (error) {
    console.log(error);
  }
};

AssetsSchema.methods.editProduct = function(product_id, product) {
  try {
    var products = this.product;
    var index = products.findIndex(pro => {
      return pro._id == product_id;
    });

    oldData = this.product[index];

    this.product[index] = {
      _id: oldData._id,
      product_id: oldData.product_id,
      purchased_date: product.purchased_date,
      warranty_period: product.warranty_period,
      model_no: product.model_no,
      serial_no: product.serial_no,
      unit_price: product.unit_price
    };
    return this.save();
  } catch (error) {
    console.log(error);
  }
};

AssetsSchema.methods.loadProduct = async function(fetch) {
  try {
    var purchased = new Date(fetch.purchased_date);
    var year = purchased.getFullYear();
    var month = purchased.getMonth() + 1;
    var dt = purchased.getDate();
    purchased = dt + "-" + month + "-" + year;
    var warranty = new Date(fetch.warranty_period);
    var year = warranty.getFullYear();
    var month = warranty.getMonth() + 1;
    var dt = warranty.getDate();
    warranty = dt + "-" + month + "-" + year;

    var ids = await IdGen.find();
    ids = ids[0];
    var product_id = ids.product + 1;

    await ids.updateProductID(product_id);
    product_id = "alcService" + product_id;
    var product_id = "alcProduct" + product_id;

    var product = this.product;
    product.push({
      product_id: product_id,
      purchased_date: purchased,
      warranty_period: warranty,
      model_no: fetch.model_no,
      serial_no: fetch.serial_no,
      unit_price: fetch.unit_price
    });
    this.product = product;

    return this.save(), true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("Assets", AssetsSchema);
