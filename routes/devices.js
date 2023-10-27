var express = require('express');

var router = express.Router();

const DeviceService  = require('../services/devices')

//Permissions service keeps track of *who* can use *what*
//const PermissionsService = require('../services/permissions')

router.get('/', async function(req, res, next) {
	let devices = await DeviceService.getAllDevices();
	if (devices === undefined) {
		res.sendStatus(404);
	}
	else {
		res.json(devices);
	}
});

router.get('/name/:name', async function(req, res, next) {
	let device = await DeviceService.getDeviceByName(req.params.name);
	if (device === undefined) {
		res.sendStatus(404);
	}
	else {
		res.json(device);
	}
});

router.get('/:id', async function(req, res, next) {
	let devices = await DeviceService.getDeviceById(req.params.id);
	if (devices === undefined) {
		res.status(404);
	}
	else {
		res.json(devices);
	}
});

router.post('/', async function(req,res,next) {
	try {
		let device = await DeviceService.createDevice(req.body);
		res.status(201).json({"message": "Created"});
	}
	catch (err) {
	  res.status(409).json({"message": err.message});
	}  
});

router.put('/', async function(req,res,next) {
	try {
	let device = await DeviceService.updateDevice(req.body);
	console.log(device);
		res.status(201).json(device);
	}
	catch (err) {
		res.status(409).json({"message": err.message});
	}  
});

router.delete('/:id', async function(req, res, next) {
	if  (await DeviceService.deleteDevice(req.params.id)) {
		res.status(200);
	}
	else {
		//not found
		res.status(404);
	}
});

module.exports = router;
