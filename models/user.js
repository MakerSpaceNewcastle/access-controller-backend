var db = require('../db/db');

exports.find = async() => {
    var sql = "SELECT * FROM user ORDER BY name"
    var params = []
    return await db.dball(sql, params); 
}

exports.findById = async(id) => {
    var sql = 'SELECT * FROM USER WHERE id=?'
    var params = [id];
    return await db.dbget(sql, params);
}

exports.create = async(user) => {
    var sql = 'INSERT INTO user (name, phone, email, active, keyholder) VALUES (?,?,?,?,?);'
    var params = [user.name, user.phone, user.email, user.active, user.keyholder];
    return result =  await db.dbrun(sql, params);
}

exports.delete = async(id) => {
    var sql = 'DELETE FROM user WHERE id = ?;'
    var params = [id];   
    return await db.dbdelete(sql, params);
}

exports.update = async(user) => {
    var sql = 'UPDATE user SET name = ?, phone = ?, email =?, active = ?, keyholder=? WHERE id = ?';
    var params = [ user.name, user.phone, user.email, user.active, user.keyholder, user.id];
    return await db.dbrun(sql, params);
}
