const e = require('express');
const LogEventModel = require('../models/logevent');

exports.logEvent = async (event) => {
    return await LogEventModel.create(event);
}

exports.getEvents = async(startnum, endnum, device) => {
    if (isNaN(startnum)|| isNaN(endnum) || startnum < 0 || endnum < 0) {
        throw new Error("Invalid start/end numbers")
    }
    return await LogEventModel.find(startnum, endnum, device);
}

exports.getEventCount = async(device) => {
    return await LogEventModel.count(device);
}
