var db = require('../db/db');

exports.findByUserId = async(user_id) => {
    var sql = 'SELECT * FROM permission WHERE user_id = ?'
    var params = [user_id];
    return await db.dball(sql, params);
}

exports.findByDeviceId = async(device_id) => {
    var sql = 'SELECT * FROM permission WHERE device_id = ?'
    var params = [device_id];
    return await db.dball(sql, params);
}

exports.create = async(permission) => {
    var sql = 'INSERT INTO permission (user_id, device_id) VALUES (?,?);'
    var params = [permission.user_id, permission.device_id];
    return await db.dbrun(sql, params);
}

exports.delete = async(id) => {
    var sql = 'DELETE FROM permission WHERE id = ?;'
    var params = [id];   
    return await db.dbdelete(sql, params);
}

exports.deleteByUserId = async(id) => {
    var sql = 'DELETE FROM permission WHERE user_id = ?;'
    var params = [id];   
    return await db.dbdelete(sql, params);
}

exports.deleteByDeviceId = async(id) => {
    var sql = 'DELETE FROM permission WHERE device_id = ?;'
    var params = [id];   
    return await db.dbdelete(sql, params);
}

//Find the list of devices that a specific user is allowed to access.
exports.findDevicesForUser = async (user_id) => {
    var sql = "SELECT device.* FROM device, permission WHERE permission.user_id = ? AND device.id = permission.device_id"
    var params = [user_id];
    return await db.dball(sql, params);
}

exports.getHashesByDeviceId = async(device_id) => {
    var sql = "SELECT rfid.card_hash FROM rfid, user, permission WHERE rfid.active = 1 AND user.active = 1 AND user.id = rfid.user_id AND permission.device_id = ? AND permission.user_id = user.id"
    var params = [device_id];
    return await db.dball(sql, params);
}

//Get the list of users for a particular device
exports.findUsersForDevice = async(device_id) => {  
    var sql = "SELECT user.* FROM user, permission WHERE permission.device_id = ? AND user.id = permission.user_id ORDER BY user.name";
    var params = [device_id];
    return await db.dball(sql,params); 
}