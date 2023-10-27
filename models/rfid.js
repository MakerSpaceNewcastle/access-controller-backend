var db = require('../db/db');

//This is find by user ID.
exports.findByUserId = async(user_id) => {
    var sql = 'SELECT * FROM rfid WHERE user_id = ?'
    var params = [user_id];
    return await db.dball(sql, params); 
}

exports.create = async (rfid) => {
    var sql = 'INSERT INTO rfid (user_id, card_hash, description, active) VALUES (?,?,?,?);'
    var params = [rfid.user_id, rfid.card_hash, rfid.description, rfid.active];
    return await db.dbrun(sql, params);
} 

exports.delete = async(id) => {
    var sql = 'DELETE FROM rfid WHERE id = ?;'
    var params = [id];   
    return await db.dbdelete(sql, params);
}

exports.deleteByUserId = async(id) => {
    //Deletes all RFIDs associated with a user (useful when deleting a user)
    var sql = 'DELETE FROM rfid WHERE user_id = ?;'
    var params = [id];   
    return await db.dbdelete(sql, params);
}