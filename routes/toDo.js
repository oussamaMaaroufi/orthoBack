const express = require('express');
const router = express.Router();
const passport = require('passport');
const ToDo = require('../models/toDo');

router.post('/add', (req, res, next) => {
  console.log(req.body)
    let newToDo = new ToDo({
        idUser: req.body.idUser,
        idExercice: req.body.idExercice,
        AvgScore:req.body.AvgScore,
        idOrtho : req.body.idOrtho,
    });
    
  
    newToDo.save((err, todo) => {
      if (err) {
      //  console.log(err);
        return res.send({
          success: false,
          message: 'Failed to save the todo'
        });
      }
      if (!todo) {
        return res.send({
          success: false,
          message: 'Error, Invalid todo'
        });
      }
      res.send({
        success: true,
        message: 'todo Saved',
        todo
      });
    });
  });
  
  
  //find , passport.authenticate('jwt', { session : false})
  
  router.get('/list' ,(req, res, next) => {
    //const owner = req.body.owner;
    //console.log('test')
    ToDo.find((err, todo)=>{
      if (err) {
        return res.send({
          success: false,
          message: 'Error while reteriving the todo'
        });
      }
  
      return res.send({
       // success: true,
        todo
      });
    });
  });
  
  // /getuser
  router.post('/get', (req, res, next) => {
    let _id  = req.body.id;
    let query = {_id}
    console.log(query);
    ToDo.findById( query ,(err, todo)=>{
      if (err) {
        return res.send({
          success: false,
          message: 'Error while reteriving the todo'
        });
      }
    //  console.log(exercice);
      return res.send({
        success: true,
        todo
      // user
      });
    });
  });



  router.post('/delete', (req, res, next) => {
    // console.log(req)
     let _id  = req.body._id;
     let query = {_id}
     console.log(query)
     //Check the user exists
     ToDo.findByIdAndRemove(query, (err, todo) => {
       //Error during exuting the query
       if (err) {
         return res.send({
           success: false,
           message: 'Error, please try again'
         });
       }else{
         
           //Send the response back
           return res.send({
             success: true,
             message: 'Delete is success',
             todo
           });
       }
       });
     });





  
  router.post('/update', (req, res, next) => {
    const todoR =({
        _id  : req.body.id,
        idUser: req.body.idUser,
        idExercice: req.body.idExercice,
        AvgScore:req.body.AvgScore,
        idOrtho :req.body.idOrtho,
  
      });
      const _id= req.body.id;
      const query = {_id}

      ToDo.updateOne(query,todoR,err => {
          if (err){
            return res.send({
                success: false,
                message: err
              });
          }
      })
      ToDo.findOne(query, (err, todo1) => {
        //Error during exuting the query
        if (err) {
          return res.send({
            success: false,
            message: 'Error, please try again'
          });
        }
    
        //No User match the search condition
        if (!todo1) {
          return res.send({
            success: false,
            message: 'Error, todo not found'
          });
        }
        return res.send({
          success: true,
          todo : todo1
        // user
        });
    
        });
   
   
  });
  
  

     router.post('/getById', (req, res, next) => {
        // console.log(req)
         const _id = req.body.id;
         const query = { _id }
         console.log(query)
         //Check the user exists
         ToDo.findById(query, (err, todo) => {
           //Error during exuting the query
           if (err) {
             return res.send({
               success: false,
               message: 'Error, please try again'
             });
           }
       
           //No User match the search condition
           if (!todo) {
             return res.send({
               success: false,
               message: 'Error, todo not found '
             });
           }else{
            // console.log(animal)
               //Send the response back
               return res.send({
                 success: true,
               message: 'success',
               todo : todo
               });
           }
           });
         });

         router.post('/getByIdUser', (req, res, next) => {
          let idUser  = req.body.idUser;
          let query = {idUser}
          console.log(query);
          ToDo.find( query ,(err, todo)=>{
            if (err) {
              return res.send({
                success: false,
                message: 'Error while reteriving the todo'
              });
            }
          //  console.log(exercice);
            return res.send({
              success: true,
              todo
            // user
            });
          });
        });
        router.post('/getByIdOrtho', (req, res, next) => {
          let idOrtho  = req.body.idOrtho;
          let query = {idOrtho}
          console.log(query);
          ToDo.find( query ,(err, todo)=>{
            if (err) {
              return res.send({
                success: false,
                message: 'Error while reteriving the todo'
              });
            }
          //  console.log(exercice);
            return res.send({
              success: true,
              todo
            // user
            });
          });
        });

      


  module.exports = router;
  