const express = require('express');
const router = express.Router();
const passport = require('passport');

const HasOrth = require('../models/hasOrth');

const User = require('../models/user.js');
router.post('/add', (req, res, next) => {

    const code= req.body.code;
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


  console.log(req.body)
    let newHasOrth = new HasOrth({
        nameP: req.body.nameP,
        idP: req.body.idP,
        idOrtho:user1.id,
        valid: false

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
      // user
      });
    });
  });
  
  router.post('/update', (req, res, next) => {
    const hasOrthR =({
        valid: true
  
      });
      const _id= req.body.id
      const query = {_id}

      HasOrth.updateOne(query,hasOrthR,err => {
          if (err){
            return res.send({
                success: false,
                message: err
              });
          }
      })
    if(!hasOrthR){
        return res.send({
            success: false,
            message: "!HasOrth",
          });
    }
    return res.send({
        success: true,
        message: "!HasOrth is updated",
        hasOrth : hasOrthR
      });
  });
  
  router.post('/delete', (req, res, next) => {
    // console.log(req)
     let _id  = req.body.id;
     let query = {_id}
     console.log(query)
     //Check the user exists
     HasOrth.findByIdAndRemove(query, (err, hasOrth) => {
       //Error during exuting the query
       if (err) {
         return res.send({
           success: false,
           message: 'Error, please try again'+query._id 
         });
       }else{
         
           //Send the response back
           return res.send({
             success: true,
             message: 'Delete is success',
             hasOrth
           });
       }
       });
     });

     router.post('/getById', (req, res, next) => {
        // console.log(req)
         const _id = req.body._id;
         const query = { _id }
         console.log(query)
         //Check the user exists
         HasOrth.findById(query, (err, hasOrth) => {
           //Error during exuting the query
           if (err) {
             return res.send({
               success: false,
               message: 'Error, please try again'+query
             });
           }
       
           //No User match the search condition
           if (!hasOrth) {
             return res.send({
               success: false,
               message: 'Error, Account not found '+query.IdUser
             });
           }else{
            // console.log(animal)
               //Send the response back
               return res.send({
                 success: true,
               message: 'success',
               hasOrth
               });
           }
           });
         });
  module.exports = router;
  