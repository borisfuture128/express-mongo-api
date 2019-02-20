var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

//set secret

var key = "howareyouusernamepassword";

router.post('/',(req,res)=>{
    var isExistUsername = false, isPassword = false
    config.users.forEach(function(user){
        if(user.username == req.body.username){
            isExistUsername = true
            if(user.password == req.body.password){
                isPassword = true
            }
        } 
    })
  if(isExistUsername){
      if(isPassword){
           //if eveything is okey let's create our token 
        const payload = {
            check:  true
        };
          var token = jwt.sign(payload, key, {
              expiresIn: 3600 // expires in 1 minute
          });

        res.json({
          message: 'authentication done',
          token: token
        });
      }else{
          res.json({message:"please check your password!"})
      }
  }else{
      res.json({message:"user not found!"})
  }

})

router.use((req, res, next) =>{
    // check header for the token
    var token = req.headers['access-token'];

    // decode token
    if (token) {

      // verifies secret and checks if the token is expired
      jwt.verify(token, key, (err, decoded) =>{      
        if (err) {
          return res.json({ message: 'invalid token' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;   
          console.log(decoded) 
          next();
        }
      });

    } else {

      // if there is no token  

      res.send({ 

          message: 'No token provided.' 
      });

    }
 })

 module.exports = router;