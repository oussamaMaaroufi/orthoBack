const mongoose = require('mongoose');

// Schema Definition
const ToDoSchema = mongoose.Schema({
    idUser: String,
    idExercice: String,
    idOrtho :String,
    AvgScore:String,
  });

  const ToDo = mongoose.model('Todo',ToDoSchema);
  module.exports= ToDo;