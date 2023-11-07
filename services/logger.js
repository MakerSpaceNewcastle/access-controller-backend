const LogEventModel = require('../models/logevent');
const RfidModel  = require('../models/rfid');

exports.logEvent = async (event) => {
    //If a hash has been provided to us, see if we can identify the user
    //so we can store their name in the log message
    if (event.type === undefined || event.name === undefined) {
        throw new Error("Name and Type must be defined at minimum");
    }

    if (event.hash !== undefined) {
        //Look up the user this hash is registered to, and set message to include
        //their username.
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
    if (isNaN(startnum)|| isNaN(endnum) || startnum < 0 || endnum < 0 || endnum < startnum) {
        throw new Error("Invalid start/end numbers")
    }
    return await LogEventModel.find(startnum, endnum, device);
}

exports.getEventCount = async(device) => {
    return await LogEventModel.count(device);
}
