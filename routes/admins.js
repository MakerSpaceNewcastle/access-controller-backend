var express = require('express');
var router = express.Router();

const AdminService = require('../services/admins')

router.get('/', async function(req, res, next) {
    try {
      res.status(201).json(await AdminService.getAllAdmins());   
    }
    catch (err) {
      res.status(500).json({"message": err.message});
    }
  });
  
router.delete('/:id', async function(req, res, next) {
  try {
    let result = await AdminService.delete(req.params.id);
    res.status(200).json({"message": "Delete successful"});
  }
  catch (err) {
    res.status(500).json({"message": err.message});
  }
});

router.get('/:id', async function(req,res,next) {
  try {
    res.status(201).json(await AdminService.getAdminById(req.params.id));   
  }
  catch (err) {
    res.status(500).json({"message": err.message});
  }
});

router.put('/', async function(req,res,next) {
  try {
    let result = await AdminService.createOrUpdateAdmin(req.body);
    res.status(201).json({"message" : "ok"});
  }
  catch (err) {
    res.status(400).json({"message": err.message});
  }
})

router.post('/', async function(req,res,next) {
  console.log("posting")
  try {
    let result = await AdminService.createOrUpdateAdmin(req.body);
    res.status(201).json({"message": "created with userID " + result});
  }
  catch (err) {
    console.log("User post failed - " + err.message);
    res.status(400).json({"message": err.message});
  }  
})

module.exports = router;
