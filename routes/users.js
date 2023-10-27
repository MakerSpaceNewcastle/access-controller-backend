var express = require('express');
var router = express.Router();

const {UserModel} = require('../models/user');
const UserService = require('../services/users')

//Permissions service keeps track of *who* can use *what*
//const PermissionsService = require('../services/permissions')

router.get('/', async function(req, res, next) {
  try {
    res.status(201).json(await UserService.getAllUsers());   
  }
  catch (err) {
    res.status(500).json({"message": err.message});
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    let result = await UserService.getUserById(req.params.id);
    if (result !== undefined) {
		  res.status(201).json(result);
    }
	  else {
		  res.status(404).json({"message": "Not found"})
	  }
  }
  catch (err) {
    console.log("User get by Id failed " + err.message);
    res.status(500).json({"message": err.message});
  }
});

router.post('/', async function(req,res,next) {
  try {
    let result = await UserService.createOrUpdateUser(req.body);
    res.status(201).send(result);
  }
  catch (err) {
    console.log("User post failed - " + err.message);
    res.status(400).json({"message": err.message});
  }  
})

router.put('/', async function(req,res,next) {
  try {
    let result = await UserService.createOrUpdateUser(req.body);
    res.status(201).send(result);
  }
  catch (err) {
    res.status(400).json({"message": err.message});
  }
})

router.delete('/:id', async function(req,res,next) {
  try {
    let user = await UserService.deleteUser(req.params.id);
    res.status(200).json({"message": "Delete succesful"});
   }
  catch (err) {
    res.status(400).json({"message": err.message});
  }
});

module.exports = router;
