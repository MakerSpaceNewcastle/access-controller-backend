var db = require('../db/db');

exports.find = async() => {
      var sql = "SELECT * FROM DEVICE ORDER BY name"
      var params = []
      return await db.dball(sql, params); 
}

exports.findById = async(id) => {
    var sql = 'SELECT * FROM DEVICE WHERE id=?'
    var params = [id];
    return await db.dbget(sql, params);
}

exports.findByName = async(name) => {
    var sql = 'SELECT * FROM DEVICE WHERE name=?'
    var params = [name];
    return await db.dbget(sql, params);
}

exports.create = async(device) => {
    var sql = 'INSERT INTO DEVICE (name, description, available) VALUES (?,?,?);'
    var params = [device.name, device.description, device.available];
    return await db.dbrun(sql, params);
}

exports.delete = async(id) => {
    var sql = 'DELETE FROM device WHERE id = ?;'
    var params = [id];   
    return await db.dbdelete(sql, params);
}

exports.update = async(device) => {
    var sql = 'UPDATE device SET name = ?, description = ?, available =? WHERE id = ?';
    var params = [ device.name, device.description, device.available, device.id];
    return await db.dbrun(sql, params);
}