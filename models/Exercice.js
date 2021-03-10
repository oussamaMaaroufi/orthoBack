const mongoose = require('mongoose');

// Schema Definition
const ExerciceSchema = mongoose.Schema({
    name: String,
    category: String,
    type:String,
    niveau:String
  });

  const Exercice = mongoose.model('Exercice',ExerciceSchema);
  module.exports= Exercice;