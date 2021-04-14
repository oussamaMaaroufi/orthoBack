require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodayParser = require('body-parser');
const passport = require('passport');
//Intiailzie app with express
const app = express();




//Database Connection
mongoose.Promise = global.Promise; // Fix Deprecation issue
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true , useUnifiedTopology: true });

//Port to be used by the server
const _PORT = process.env.PORT;
const mongoURI = process.env.DATABASE;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI,{ useNewUrlParser: true , useUnifiedTopology: true ,useFindAndModify: true});
let gfs;


conn.on('connected', () => {

  console.log('Connected to the database');
});
conn.on('error',  (err) => {
  console.log(`Unable to connect to the database: ${err}`);
});


//---------------- Middlewares ----------------//
//CROS MW
app.use(cors());

//Body Parser MW

app.use(bodayParser.json());

//Passport MW
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//---------------- Middlewares ----------------//


//Index Rotuer
app.get('/', (req, res, next) => {
  res.send('I am alive')
});


const UserRoutes = require('./routes/users');
const ExerciceRoutes = require('./routes/exercices');
const ToDoRoutes = require('./routes/toDo');  
const DoneRoutes = require('./routes/done');
const HasOrthRoutes = require('./routes/hasOrth');

//Users Routes
app.use('/users', UserRoutes);
app.use('/exercices',ExerciceRoutes);
app.use('/todo',ToDoRoutes);
app.use('/done',DoneRoutes);
app.use('/hasOrth',HasOrthRoutes);

//Start the server jfdnjfjg
app.listen(_PORT, () => {
  console.log('Server Started');
});

