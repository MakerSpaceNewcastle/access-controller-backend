//Services in here are specifically for the use of the access controller devices themselves.

const CryptoJS = require('crypto-js');
const PermissionService = require('../services/permissions')

exports.generateDBHash = async (devicename) => {   
    let hashes = await PermissionService.getHashesForDevice(devicename);
    let hashstring = "";
    hashes.forEach(e=>{hashstring += e.card_hash + "\r\n"});
    let db_hash = CryptoJS.MD5(hashstring).toString(CryptoJS.enc.Base64)
    return db_hash;
}

exports.generateDBString = async (devicename) => {
    let hashes = await PermissionService.getHashesForDevice(devicename);
    let hashstring = "";
    hashes.forEach(e=>{hashstring += e.card_hash + "\n"});
    return hashstring;
}
