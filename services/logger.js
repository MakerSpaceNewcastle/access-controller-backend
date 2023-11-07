const e = require('express');
const LogEventModel = require('../models/logevent');

exports.logEvent = async (event) => {
    //If a hash has been provided to us, see if we can identify the user
    //so we can store their name in the log message
    if (event.hash !== undefined) {
        //Look up the user this hash is registered to, and set message.
        let user = await RfidModel.findUserByHash(event.hash);
        if (user !== undefined) {
            event.message = user.name + " (" + event.hash + ")";
        }
        else {
            event.message = "Unknown - " + event.hash;
        }
    }
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
