const express = require('express');
const router = express.Router();
const passport = require('passport');

const Done = require('../models/done');

router.post('/add', (req, res, next) => {
  console.log(req.body)
    let newDone = new Done({
        idUser: req.body.idUser,
        idExercice: req.body.idExercice,
        exerciceName:req.body.exerciceName,
        idToDo:req.body.idToDo,
        score:req.body.score,
        iteration:req.body.iteration
    });
    
  
    newDone.save((err, done) => {
      if (err) {
      //  console.log(err);
        return res.send({
          success: false,
          message: 'Failed to save the done'
        });
      }
      if (!done) {
        return res.send({
          success: false,
          message: 'Error, Invalid done'
        });
      }
      res.send({
        success: true,
        message: 'done Saved',
        done
      });
    });
  });
  
  
  //find , passport.authenticate('jwt', { session : false})
  
  router.get('/list' ,(req, res, next) => {
    //const owner = req.body.owner;
    //console.log('test')
    Done.find((err, done)=>{
      if (err) {
        return res.send({
          success: false,
          message: 'Error while reteriving the done'
        });
      }
  
      return res.send({
       // success: true,
       done
      });
    });
  });
  
  // /getuser
  router.post('/get', (req, res, next) => {
    let _id  = req.body.id;
    let query = {_id}
    console.log(query);
    Done.findById( query ,(err, done)=>{
      if (err) {
        return res.send({
          success: false,
          message: 'Error while reteriving the done'
        });
      }
    //  console.log(exercice);
      return res.send({
        success: true,
        done
      // user
      });
    });
  });
  
  router.post('/update', (req, res, next) => {
    const doneR =({
        idUser: req.body.idUser,
        idExercice: req.body.idExercice,
        idToDo:req.body.idToDo,
        exerciceName:req.body.exerciceName,
        score:req.body.score,
        iteration:req.body.iteration
  
      });
      const _id= req.body.id;
      const query = {_id}

      Done.updateOne(query,doneR,err => {
          if (err){
            return res.send({
                success: false,
                message: err
              });
          }
      })
    if(!doneR){
        return res.send({
            success: false,
            message: "!done",
          });
    }
    return res.send({
        success: true,
        message: "!done is updated",
        done : doneR
      });
  });
  
  router.post('/delete', (req, res, next) => {
    // console.log(req)
     let _id  = req.body.id;
     let query = {_id}
     console.log(query)
     //Check the user exists
     Done.findByIdAndRemove(query, (err, done) => {
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
             done
           });
       }
       });
     });

     router.post('/getById', (req, res, next) => {
        // console.log(req)
         const _id = req.body.id;
         const query = { _id }
         console.log(query)
         //Check the user exists
         Done.findById(query, (err, done) => {
           //Error during exuting the query
           if (err) {
             return res.send({
               success: false,
               message: 'Error, please try again'
             });
           }
       
           //No User match the search condition
           if (!done) {
             return res.send({
               success: false,
               message: 'Error, Account not found '+query.IdUser
             });
           }else{
               //Send the response back
               return res.send({
                 success: true,
               message: 'success',
               done : done
               });
           }
           });
         });

         router.post('/getByIdP', (req, res, next) => {
          // console.log(req)
           const idUser = req.body.idUser;
           const query = { idUser }
           console.log(query)
           //Check the user exists
           Done.find(query, (err, done) => {
             //Error during exuting the query
             if (err) {
               return res.send({
                 success: false,
                 message: 'Error, please try again'
               });
             }
         
             //No User match the search condition
             if (!done) {
               return res.send({
                 success: false,
                 message: 'Error, Account not found '+query.IdUser
               });
             }else{
                 //Send the response back
                 return res.send({
                   success: true,
                 message: 'success',
                 done : done
                 });
             }
             });
           });

           router.post('/getscore', (req, res, next) => {
            //let _id  = req.body.id;
            // let query = {_id}
            let idUser= req.body.idUser;
            let idExercice= req.body.idExercice;
            let query = {idUser,idExercice}
           
            console.log(query);
            Done.find( query ,(err, done)=>{
              if (err) {
                return res.send({
                  success: false,
                  message: 'Error while reteriving the done score'
                });
              } 
              return res.send({
                success: true,
                done 
              });
            });
          });
  module.exports = router;
  