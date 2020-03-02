const Trash = require("../../models/RecycleBin");

exports.getTrash = async (req, res, next) => {
  try {
    const trash = await Trash.find();
    res.status(200).json({
      trash: trash
    });
  } catch (error) {
    console.log(error);
  }
};
