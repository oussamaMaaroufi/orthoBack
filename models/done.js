const mongoose = require('mongoose');

// Schema Definition
const DoneSchema = mongoose.Schema({
    idUser: String,
    idExercice: String,
    idToDo:String,
    score:String,
    exerciceName:String,
    iteration:String
  });

  const Done = mongoose.model('Todo',DoneSchema);
  module.exports= Done;