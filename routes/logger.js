var express = require('express');
var router = express.Router();

const logger = require('../services/logger')

router.get('/count', async function(req,res,next) {
    //This exists so the UI can work out how many page numbers it wants to display..
    res.status(200).json(await logger.getEventCount(req.query.device));
});

router.get('/', async function(req, res, next) {
    try {
        res.status(200).json(await logger.getEvents(req.query.start, req.query.end, req.query.device));
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
});

module.exports = router;
