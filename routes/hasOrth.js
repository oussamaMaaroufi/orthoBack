const express = require('express');
const router = express.Router();
const passport = require('passport');

const HasOrth = require('../models/hasOrth');

const User = require('../models/user.js');
router.post('/add', (req, res, next) => {

    const code= req.body.code;
    const query1 = {code}
  //   console.log(req.body)
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


  console.log(req.body)
    let newHasOrth = new HasOrth({
        nameP: req.body.name,
        idP: req.body.id,
        idOrtho:user1.id,
        valid: "false"

    });
    
  
    newHasOrth.save((err, hasOrth) => {
      if (err) {
      //  console.log(err);
        return res.send({
          success: false,
          message: 'Failed to save the HasOrth'
        });
      }
      if (!hasOrth) {
        return res.send({
          success: false,
          message: 'Error, Invalid HasOrth'
        });
      }
      res.send({
        success: true,
        message: 'HasOrth Saved',
        hasOrth
      });
    });
  });
  });
  
  
  //find , passport.authenticate('jwt', { session : false})
  
  router.get('/list' ,(req, res, next) => {
    //const owner = req.body.owner;
    //console.log('test')
    HasOrth.find((err, hasOrths)=>{
      if (err) {
        return res.send({
          success: false,
          message: 'Error while reteriving the HasOrth'
        });
      }
  
      return res.send({
       // success: true,
        hasOrths
      });
    });
  });
  
  // /getuser
  router.post('/get', (req, res, next) => {
    let _id  = req.body.id;
    let query = {_id}
    console.log(query);
    HasOrth.findById( query ,(err, hasOrth)=>{
      if (err) {
        return res.send({
          success: false,
          message: 'Error while reteriving the HasOrth'
        });
      }
    //  console.log(HasOrth);
      return res.send({
        success: true,
        hasOrth
      
      });
    });
  });
  
  router.post('/update', (req, res, next) => {
    console.log(req.body)
    const hasOrthR =({
        _id : req.body._id,
        valid: "true"
  
      });
      const _id= req.body._id
      const query = {_id}

      HasOrth.findByIdAndUpdate(query,hasOrthR,(err,orth) => {
          if (err){
            return res.send({
                success: false,
                message: err
              });
          }
      
    if(!orth){
        return res.send({
            success: false,
            message: "!HasOrth",
          });
    }else{

      newUser = new User({
        _id  : req.body.idP,
        hasOrtho : "true"
      
      });
      let _id  = req.body.idP;
      let query1 = {_id}
      console.log(query1);
      User.findOneAndUpdate( query1,newUser,(err, user)=>{
    
       if (err) {
         console.log(err)
        return res.send({
          success: false,
          user,
          message: 'Error while reteriving the user'
        });
      }
    

      return res.send({
        success: true,
        message: "!HasOrth is updated",
        hasOrth : orth,
        user
      });

    });

    }
  });
  });
  
  router.post('/delete', (req, res, next) => {
    // console.log(req)
     let _id  = req.body._id;
     let query = {_id}
     console.log(query)
     //Check the user exists
     HasOrth.findByIdAndDelete(query, (err, hasOrth) => {
       //Error during exuting the query
       if (err) {
         return res.send({
           success: false,
           message: 'Error, please try again'+query._id 
         });
       }else{

      newUser = new User({
        _id  : req.body.idP,
        hasOrtho : "false"
      
      });
      let _id  = req.body.idP;
      let query1 = {_id}
      console.log(query1);
      User.findOneAndUpdate( query1,newUser,(err, user)=>{
    
       if (err) {
         console.log(err)
        return res.send({
          success: false,
          user,
          message: 'Error while reteriving the user'
        });
      }
    

      return res.send({
        success: true,
        message: "!HasOrth is updated",
        hasOrth : hasOrth,
        user
      });

    });
         
         
       }
       });
     });

     router.post('/getByIdOrtho', (req, res, next) => {
        // console.log(req)
         const idOrtho = req.body.id;
         const query = { idOrtho }
         console.log(query)
         HasOrth.find(query, (err, hasOrth) => {
           //Error during exuting the query
           if (err) {
             return res.send({
               success: false,
               message: 'Error, please try again'
             });
           }
       
           //No User match the search condition
           if (!hasOrth) {
             return res.send({
               success: false,
               message: 'Error, Account not found '
             });
           }else{
               return res.send({
                hasOrth
               });
           }
           });
         });



         router.post('/getByIdP', (req, res, next) => {
            // console.log(req)
             const idP = req.body.id;
             const query = { idP }
             console.log(query)
             //Check the user exists
             HasOrth.findOne(query, (err, hasOrth) => {
               //Error during exuting the query
               if (err) {
                 return res.send({
                   success: false,
                 });
               }
           
               //No User match the search condition
               if (!hasOrth) {
                 return res.send({
                   success: false,
                 });
               }else{
                // console.log(animal)
                   //Send the response back
                   return res.send({
                     success: true,
                   
                   });
               }
               });
             });


  module.exports = router;
  