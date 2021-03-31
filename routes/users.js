const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.js')
const passport = require('passport');
const { use } = require('passport');


//Login
router.post('/auth', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;



  const query = { email}
  //Check the user exists
  User.findOne(query, (err, user) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'
      });
    }

    //No User match the search condition
    if (!user) {
      return res.send({
        success: false,
        message: 'Error, Account not found'+req.body
      });
    }

    //Check if the password is correct
    user.isPasswordMatch(password, user.password, (err, isMatch) => {

        //Invalid password
        if (!isMatch) {
          return res.send({
            success: false,
            message: 'Error, Invalid Password'
          });
        }

        //User is Valid

        const ONE_WEEK =  3000 ;//604800; //Token validtity in seconds

        //Generating the token
        const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: ONE_WEEK });

        //User Is Valid
        //This object is just used to remove the password from the retuned fields
        let returnUser = {
          name: user.name,
          email: user.email,
          type :user.type,
          id: user._id,
          code : user.code
        }

        //Send the response back
        return res.send({
        //  success: true,
        //  message: 'You can login now',
          user: returnUser,
          token
        });
    });

  });

});

//Registeration patenit
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    type:req.body.type,
    password: req.body.password,
  });
  const email= req.body.email;
  const query = {email}
  //Check the user exists
  User.findOne(query, (err, user) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'
      });
    }
    if (user) {
      return res.send({
        success: false,
        message: 'Error, email used'
      });
    }
  
  

  newUser.save((err, user) => {
    if (err) {
    //  console.log(err);
      return res.send({
        success: false,
        message: 'Failed to save the user'+err
      });
    }
    if (!user) {
      return res.send({
        success: false,
        message: 'Error, Invalid user'
      });
    }
    res.send({
     // success: true,
     // message: 'User Saved',
      user
    });
  });
});
});





//Registeration Ortho
router.post('/registerOrtho', (req, res, next) => {
  
  const email= req.body.email;
  const code= req.body.codeV;
  console.log(email);
 

  const query = {email}
  const query1 = {code}
  //Check the user exists
  User.findOne(query1, (err1, user1) => {

    if (err1) {
      return res.send({
        success: false,
        message: 'Error, please try again'
      });
    }
    if (!user1) {
      return res.send({
        success: false,
        message: 'Error, code incorrect'
      });
    }


  User.findOne(query, (err2, user2) => {
    //Error during exuting the query
    if (err2) {
      return res.send({
        success: false,
        message: 'Error, please try again'
      });
    }
    if (user2) {
      return res.send({
        success: false,
        message: 'Error, email used'
      });
    }

     newUser = new User({
      name: req.body.name,
      email: req.body.email,
      type:req.body.type,
      password: req.body.password,
      code: req.body.code,
      idInv:user1.id
    });
  
  

  newUser.save((err, user) => {
    if (err) {
    //  console.log(err);
      return res.send({
        success: false,
        message: 'Failed to save the user'+err
      });
    }
    if (!user) {
      return res.send({
        success: false,
        message: 'Error, Invalid user'
      });
    }
    res.send({
     // success: true,
     // message: 'User Saved',
      user
    });
  });
});
});
});











//find , passport.authenticate('jwt', { session : false})

router.get('/list' ,(req, res, next) => {
  //const owner = req.body.owner;
  console.log('test')
  User.find((err, users)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
     // success: true,
      users
    });
  });
});

// /getuser
router.post('/getuser', (req, res, next) => {
  let _id  = req.body.id;
  let query = {_id}
  console.log(query);
  User.findById( query ,(err, user)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }
  //  console.log(user);
    return res.send({
      success: true,
      user
    // user
    });
  });
});


module.exports = router;
