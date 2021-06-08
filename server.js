require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodayParser = require('body-parser');
const passport = require('passport');
//Intiailzie app with express
const app = express();
const MongoClient = require('mongodb').MongoClient;




     // import the routes

     app.use(express.json()); // parses incoming requests with JSON payloads

   



//Database Connection
mongoose.Promise = global.Promise; // Fix Deprecation issue
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true , useUnifiedTopology: true });

//Port to be used by the server
const _PORT = process.env.PORT;
const mongoURI = process.env.DATABASE;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI,{ useNewUrlParser: true , useUnifiedTopology: true });
let gfs;


conn.on('connected', () => {

  console.log('Connected to the database');
});
conn.on('error',  (err) => {
  console.log(`Unable to connect to the database: ${err}`);
});

const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
   client.connect(err => {
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
   });





//---------------- Middlewares ----------------//
//CROS MW
app.use(cors());

//Body Parser MW

app.use(bodayParser.json());

app.use(bodayParser.urlencoded({ extended: true, limit: "50mb" }));

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
const StutterRoutes = require('./routes/stutter');

//Users Routes
app.use('/users', UserRoutes);
app.use('/exercices',ExerciceRoutes);
app.use('/todo',ToDoRoutes);
app.use('/done',DoneRoutes);
app.use('/hasOrth',HasOrthRoutes);
app.use('/stutter',StutterRoutes);

//Start the server jfdnjfjg
app.listen(_PORT, () => {
  console.log('Server Started');
});



