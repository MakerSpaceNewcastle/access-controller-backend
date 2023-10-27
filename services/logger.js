const e = require('express');
const LogEventModel = require('../models/logevent');

exports.logEvent = async (event) => {
    return await LogEventModel.create(event);
}

exports.getEvents = async(pagenum) => {
    try {
        return await LogEventModel.find(pagenum);
    } catch (err) {
        console.log("LogEvent error  - " + err);
    }    
}

exports.getEventCount = async() => {
    try {
        return await LogEventModel.count();
    }
    catch (err) {
        
    }
}
