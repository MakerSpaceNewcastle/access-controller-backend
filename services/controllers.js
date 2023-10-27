//Services in here are specifically for the use of the access controller devices themselves.

const CryptoJS = require('crypto-js');
const PermissionService = require('../services/permissions')

exports.generateDBHash = async () => {   
    let hashes = await PermissionService.getHashesForDevice(req.params.name);
    let hashstring = "";
    hashes.forEach(e=>{hashstring += e.card_hash + "\r\n"});
    let db_hash = CryptoJS.MD5(hashstring).toString(CryptoJS.enc.Base64)
    return db_hash;
}

exports.generateDBString = async () => {
    let hashes = await PermissionService.getHashesForDevice(req.params.name);
    let hashstring = "";
    hashes.forEach(e=>{hashstring += e.card_hash + "\r\n"});
    return hashstring;
}