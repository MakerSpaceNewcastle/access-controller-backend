const express = require('express');
const router = express.Router();

const ControllerService = require('../services/controllers')

const logger = require('../services/logger')

router.get('/:name/dbVersion', async function(req,res, next) {
    //Build the hash string, and send the MD5 hash back to the user.
    try {
        let db_signature = await ControllerService.generateDBHash(req.params.name);
        res.status(200).send(db_signature);
        //Record that the controller checked in
        logger.logEvent({"type": "CONTROLLER_DB_VER_CHECKIN", "source": req.params.name})
    }
    catch (err) {
	    res.status(400).json({"message": err.message});
    }
});

router.get('/:name/db', async function(req, res, next) {    
    try {
        let dbString = await ControllerService.generateDBString(req.params.name);
        res.status(200).send(dbString);
        //Record that the controller performed a DB update
        logger.logEvent({"type": "CONTROLLER_DB_UPDATE", "source": req.params.name});
    }
    catch (err) {
        res.status(400).json({"message": err.message});
    }
});

//The controller wants to tell us about an device access event - either activated/deactivated or login-fail
router.post('/:name/logEvent', async function (req, res, next) {
    try {
        //Store log event
        logger.logEvent({"type": req.body.type, "source": req.params.name, "message": req.body.message, "hash": req.body.hash})
        res.status(200).json({"message": "ok"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({"message": err.message});
    }    
});

module.exports = router;
