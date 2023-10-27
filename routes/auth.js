var express = require('express');
var router = express.Router();
const LoginService = require('../services/login')

router.post('/login', async function(req, res, next) {
    try {
        //Check that username and password are set
        if (req.body.username === undefined || req.body.password === undefined) {
            return res.status(200).json({message:"Need to specify username and password"})
        }
            
        console.log("In here");
        //Try to authenticate
        if (await LoginService.authenticate(req.body.username, req.body.password) === true) {
            //Generate and return token
            const token  = LoginService.generateToken(req.body.username);

            return res
            .cookie("access_token", token, {
                httpOnly: true
            }
            ).status(200)
            .json({message: "Successfully logged in"})    
        }
        else {
            //Nope.
            console.log("Rejected login");
            return res.status(401).json({message: "Invalid username or password"});
        }
    }      
    catch (err) {
        console.log(err.message);
    }
});

router.get('/logout', async function(req, res, next) {
    try {
      return res
        .clearCookie("access_token")
        .status(200)
        .json({message: "Successfully logged out"});
    }
    catch (err) {
        console.log(err.message);
    }
})

module.exports = router;
