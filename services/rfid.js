const { json } = require('express');
const RfidModel = require('../models/rfid');

exports.findRfidsForUser = async (user_id) => {
    return await RfidModel.findByUserId(user_id);
}

exports.createRfid = async (rfid) => {
    //Validate the RFID has a valid card hash
    if (rfid.card_hash.match(/^[0-9A-Fa-f]{32}$/) == null) {
        throw Error("Invalid card hash - must be 32 hexadecimal chars");
    }
    //Check to see if this RFID is already assigned to anybody.
    let testUser = await RfidModel.findUserByHash(rfid.card_hash);
    if (testUser !== undefined) {
        throw Error("RFID already assigned to " + testUser.name);
    }
    return await RfidModel.create(rfid);
}

exports.deleteRfid = async (id) => {
    return await RfidModel.delete(id);
}

