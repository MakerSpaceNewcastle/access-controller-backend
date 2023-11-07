const { json } = require('express');
const RfidModel = require('../models/rfid');

exports.findRfidsForUser = async (user_id) => {
    return await RfidModel.findByUserId(user_id);
}

exports.createRfid = async (rfid) => {
    //Validate the RFID has a valid card hash
    if (rfid.card_hash.match(/^[0-9A-Fa-f]{32}$/) == null) {
        throw Error("Invalid card hash - must be 32 hexadecimal chars")
    }
    return await RfidModel.create(rfid);
}

exports.deleteRfid = async (id) => {
    return await RfidModel.delete(id);
}

