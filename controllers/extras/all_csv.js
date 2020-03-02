const path = require("path");
const { spawn } = require("child_process");

exports.all_csvs = (req, res, next) => {
  function runScript() {
    return spawn("python", [path.join(__dirname, "python/addons.py")]);
  }
  const subprocess = runScript();
  subprocess.stdout.on("data", data => {
    console.log(`${data}`);
  });
  runScript();
};

exports.getAssetsCsv = (req, res, next) => {
  var file = "addons/all_assets.csv";
  res.download(file);
};

exports.getManagementsCsv = (req, res, next) => {
  var file = "addons/all_managements.csv";
  res.download(file);
};

exports.getRecyclesCsv = (req, res, next) => {
  var file = "addons/all_recycles.csv";
  res.download(file);
};

exports.getUsersCsv = (req, res, next) => {
  var file = "addons/all_users.csv";
  res.download(file);
};
