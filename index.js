const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const fs = require("fs");
const db = require("./config/keys").mongoURI;
const cors = require("cors");

const dbLoader = require("./config/loader").loadData;

const AssetRoutes = require("./routes/Asset");
const ManagementRoutes = require("./routes/Management");
const UserRoutes = require("./routes/User");
// const ExtrasRoutes = require("./routes/Extras");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a"
  }
);

app.use(helmet());
app.use(
  morgan("combined", {
    stream: accessLogStream
  })
);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(AssetRoutes);
app.use(ManagementRoutes);
app.use(UserRoutes);
// app.use(ExtrasRoutes);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public/")));

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(result => {
    dbLoader();
    console.log(`Connected to ${db}`);
  })
  .catch(err => {
    console.log(`Unable to connect with database ${err}`);
  });
