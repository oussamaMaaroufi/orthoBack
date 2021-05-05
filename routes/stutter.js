const express = require('express');
const router = express.Router();
const passport = require('passport');

const Stutter = require('../models/stutter');

router.post('/stutter', (req, res, next) => {
  console.log(req.body)
    let newStutter = new Stutter({
        idUser: req.body.idUser,
        progress: req.body.progress
    });
    
  
    newStutter.save((err, Stutter) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Failed to save the Stutter'
        });
      }
      console.log("done");
      if (!Stutter) {
        return res.send({
          success: false,
          message: 'Error, Invalid Stutter'
        });
      }
      res.send({
        success: true,
        message: 'Stutter Saved',
      });
    });
  });
  

  
  //find , passport.authenticate('jwt', { session : false})
  
  router.get('/stutter' ,(req, res, next) => {
    //const owner = req.body.owner;
    //console.log('test')
    console.log("iduser = " + req.query.idUser);
    Stutter.findOne({idUser:req.query.idUser},(err, obj)=>{
      console.log("obj =", obj);
      if (err || obj==null) {
        console.log("creating");
        Stutter.create({idUser:req.query.idUser, progress:'1'}, function(){
          return res.send({
            level:"1"
          });
        })
        return;
      }
      console.log("found and sending : " + obj.progress);
      return res.send({
       level:obj.progress
      });
    });
  });
  

  module.exports = router;