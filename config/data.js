const crypto = require("crypto");
const key = require("./keys").key;
var encrypt_key = crypto.createCipher("aes-128-cbc", key);
var password = encrypt_key.update("admin@1234", "utf8", "hex");
password = password + encrypt_key.final("hex");

exports.admin = {
  user_id: "alcUser001",
  first_name: "admin",
  last_name: "admin",
  gender: "male",
  dob: "00-00-0000",
  mobile: "1234567890",
  address: "00/00/00",
  isAdmin: true,
  username: "admin",
  password: password,
  email: "admin@admin.com"
};

exports.staff = {
  user_id: "alcUser002",
  first_name: "staff",
  last_name: "staff",
  gender: "male",
  dob: "00-00-0000",
  mobile: "1234567890",
  address: "00/00/00",
  isAdmin: false,
  username: "staff",
  password: password,
  email: "staff@staff.com"
};

exports.assets = [
  {
    asset_id: "alcAsset001",
    product_name: "cpu",
    category: "electronics",
    vendor: "dell",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, AS Street, MR Colony, India",
    summary: "es7 laptops from dell",
    comments: "new fresh stock",
    notes: "assembly needed",
    product_quantity: 6,
    total_price: 8000 * 6,
    time_stamp: Date.now(),
    product: [
      {
        product_id: "alcProduct001",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "es7LX",
        serial_no: "es701",
        unit_price: 8000
      },
      {
        product_id: "alcProduct002",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "es7LX",
        serial_no: "es702",
        unit_price: 8000
      },
      {
        product_id: "alcProduct003",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "es7LX",
        serial_no: "es703",
        unit_price: 8000
      },
      {
        product_id: "alcProduct004",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "es7LX",
        serial_no: "es704",
        unit_price: 8000
      },
      {
        product_id: "alcProduct005",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "es7LX",
        serial_no: "es705",
        unit_price: 8000
      },
      {
        product_id: "alcProduct006",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "es7LX",
        serial_no: "es706",
        unit_price: 8000
      }
    ]
  },
  {
    asset_id: "alcAsset002",
    product_name: "laptops",
    category: "electronics",
    vendor: "dell",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, AS Street, MR Colony, India",
    summary: "es7 laptops from dell",
    comments: "new fresh stock",
    notes: "nill",
    product_quantity: 6,
    total_price: 27000 * 6,
    time_stamp: Date.now(),
    product: [
      {
        product_id: "alcProduct007",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "esG7LX",
        serial_no: "esG701",
        unit_price: 27000
      },
      {
        product_id: "alcProduct008",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "esG7LX",
        serial_no: "esG702",
        unit_price: 27000
      },
      {
        product_id: "alcProduct009",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "esG7LX",
        serial_no: "esG703",
        unit_price: 27000
      },
      {
        product_id: "alcProduct0010",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "esG7LX",
        serial_no: "esG704",
        unit_price: 27000
      },
      {
        product_id: "alcProduct0011",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "esG7LX",
        serial_no: "esG705",
        unit_price: 27000
      },
      {
        product_id: "alcProduct0012",
        purchased_date: "21-11-2019",
        warranty_period: "21-11-2021",
        model_no: "esG7LX",
        serial_no: "esG706",
        unit_price: 27000
      }
    ]
  },
  {
    asset_id: "alcAsset003",
    product_name: "monitors",
    category: "electronics",
    vendor: "dell",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, AS Street, MR Colony, India",
    summary: "SGL monitors from dell",
    comments: "new fresh stock",
    notes: "nill",
    product_quantity: 27,
    total_price: 8000 * 27,
    time_stamp: Date.now()
  },
  {
    asset_id: "alcAsset004",
    product_name: "keyboards",
    category: "electronics",
    vendor: "dell",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, AS Street, MR Colony, India",
    summary: "mnx keyboards from dell",
    comments: "new fresh stock",
    notes: "nill",
    product_quantity: 27,
    total_price: 600 * 27,
    time_stamp: Date.now()
  },
  {
    asset_id: "alcAsset005",
    product_name: "speakers",
    category: "electronics",
    vendor: "bose",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, AZ Street, MR Colony, India",
    summary: "mnc speakers from bose",
    comments: "new fresh stock",
    notes: "nill",
    product_quantity: 27,
    total_price: 5200 * 27,
    time_stamp: Date.now()
  },
  {
    asset_id: "alcAsset006",
    product_name: "mic",
    category: "electronics",
    vendor: "bose",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, AZ Street, MR Colony, India",
    summary: "mnc mics from bose",
    comments: "new fresh stock",
    notes: "nill",
    product_quantity: 27,
    total_price: 4200 * 27,
    time_stamp: Date.now()
  },
  {
    asset_id: "alcAsset007",
    product_name: "chairs",
    category: "furniture",
    vendor: "SSC Furniture",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, LZ Street, MX Colony, India",
    summary: "",
    comments: "new fresh stock",
    notes: "assembly needed",
    product_quantity: 27,
    total_price: 800 * 27,
    time_stamp: Date.now()
  },
  {
    asset_id: "alcAsset008",
    product_name: "tables",
    category: "furniture",
    vendor: "SSC Furniture",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, LZ Street, MX Colony, India",
    summary: "",
    comments: "new fresh stock",
    notes: "assembly needed",
    product_quantity: 27,
    total_price: 5800 * 27,
    time_stamp: Date.now()
  },
  {
    asset_id: "alcAsset009",
    product_name: "desks",
    category: "furniture",
    vendor: "SSC Furniture",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, LZ Street, MX Colony, India",
    summary: "",
    comments: "new fresh stock",
    notes: "assembly needed",
    product_quantity: 27,
    total_price: 5800 * 27,
    time_stamp: Date.now()
  },
  {
    asset_id: "alcAsset0010",
    product_name: "plastic chairs",
    category: "furniture",
    vendor: "SSC Furniture",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, LZ Street, MX Colony, India",
    summary: "",
    comments: "new fresh stock",
    notes: "assembly needed",
    product_quantity: 27,
    total_price: 800 * 27,
    time_stamp: Date.now()
  },
  {
    asset_id: "alcAsset0011",
    product_name: "lockers",
    category: "furniture",
    vendor: "SSC Furniture",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, LZ Street, MX Colony, India",
    summary: "",
    comments: "new fresh stock",
    notes: "nill",
    product_quantity: 27,
    total_price: 8000 * 27,
    time_stamp: Date.now()
  },
  {
    asset_id: "alcAsset0012",
    product_name: "projector",
    category: "electronics",
    vendor: "benq",
    vendor_contact_no: "9797898912",
    vendor_address: "21-10/1, LZ Street, MX Colony, India",
    summary: "",
    comments: "new fresh stock",
    notes: "assembly needed",
    product_quantity: 27,
    total_price: 800 * 27,
    time_stamp: Date.now()
  }
];
