const router = express.Router();
const express = require('express');
const passport = require('passport');

const Exercice = require('../models/Exercice');

router.post('/add', (req, res, next) => {
    let newExercice = new Exercice({
      name: req.body.name,
      category: req.body.category,
      type:req.body.type,
      niveau: req.body.niveau

    });
    
  
    newExercice.save((err, exercice) => {
      if (err) {
      //  console.log(err);
        return res.send({
          success: false,
          message: 'Failed to save the exercice'
        });
      }
      if (!exercice) {
        return res.send({
          success: false,
          message: 'Error, Invalid exercice'
        });
      }
      res.send({
        success: true,
        message: 'exercice Saved',
        exercice
      });
    });
  });
  
  
  //find , passport.authenticate('jwt', { session : false})
  
  router.get('/list' ,(req, res, next) => {
    //const owner = req.body.owner;
    //console.log('test')
    Exercice.find((err, exercices)=>{
      if (err) {
        return res.send({
          success: false,
          message: 'Error while reteriving the exercice'
        });
      }
  
      return res.send({
       // success: true,
        exercices
      });
    });
  });
  
  // /getuser
  router.post('/get', (req, res, next) => {
    let _id  = req.body.id;
    let query = {_id}
    console.log(query);
    Exercice.findById( query ,(err, exercice)=>{
      if (err) {
        return res.send({
          success: false,
          message: 'Error while reteriving the exercice'
        });
      }
    //  console.log(exercice);
      return res.send({
        success: true,
        exercice
      // user
      });
    });
  });
  
  router.post('/update', (req, res, next) => {
    const ExerciceR =({
        name: req.body.name,
        category: req.body.category,
        type:req.body.type,
        niveau: req.body.niveau
  
      });
      const IdUser= req.body.IdUser;
      const query = {id}

      Exercice.update(query,ExerciceR,err => {
          if (err){
            return res.send({
                success: false,
                message: err
              });
          }
      })
    if(!ExerciceR){
        return res.send({
            success: false,
            message: "!exercice",
          });
    }
    return res.send({
        success: true,
        message: "!exercice is updated",
        Exercice : ExerciceR
      });
  });
  
  router.post('/delete', (req, res, next) => {
    // console.log(req)
     let _id  = req.body._id;
     let query = {_id}
     console.log(query)
     //Check the user exists
     Exercice.findByIdAndRemove(query, (err, exercice) => {
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
             exercice
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
         Exercice.findById(query, (err, exercice) => {
           //Error during exuting the query
           if (err) {
             return res.send({
               success: false,
               message: 'Error, please try again'+query
             });
           }
       
           //No User match the search condition
           if (!exercice) {
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
               Exercice : exercice
               });
           }
           });
         });
  module.exports = router;
  