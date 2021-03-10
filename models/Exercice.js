const mongoose = require('mongoose');
const router = express.Router();


// Schema Definition
const ExerciceSchema = mongoose.Schema({
    name: String,
    category: String,
    type:String,
    niveau:String
  });

  const Exercice = mongoose.model('Exercice',ExerciceSchema);
  module.exports= Exercice;