const { json } = require('express');
const RfidModel = require('../models/rfid');

exports.findRfidsForUser = async (user_id) => {
    return await RfidModel.findByUserId(user_id);
}

exports.createRfid = async (rfid) => {
    return await RfidModel.create(rfid);
}

exports.deleteRfid = async (id) => {
    return await RfidModel.delete(id);
}

