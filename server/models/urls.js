const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 5 });

const schema = mongoose.Schema({
  fullURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
    default: function () {
      return uid();
    },
  },
});

module.exports = mongoose.model("URL", schema);
