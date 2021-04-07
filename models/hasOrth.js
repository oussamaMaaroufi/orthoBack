const mongoose = require('mongoose');

// Schema Definition
const HasOrthSchema = mongoose.Schema({
    nameP: String,
    idP: String,
    idOrtho:String,
    valid:String,
  });

  const HasOrth = mongoose.model('hasOrth',HasOrthSchema);
  module.exports= HasOrth;