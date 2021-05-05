const mongoose = require('mongoose');

// Schema Definition
const StutterSchema = mongoose.Schema({
    idUser: String,
    progress:String
  });

  const Stutter = mongoose.model('Stutter',StutterSchema);
  module.exports= Stutter;