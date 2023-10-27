const e = require('express');
var db = require('../db/db');
var md5 = require('md5')

//Function to return true or false depending on whether the details match an entry in the administrator table.
exports.authenticate = async(username, password) => {
      var sql = `SELECT * FROM administrator WHERE username=? AND password_hash = ?`
        var params = [username, md5(password)];
        let result = await db.dbget(sql, params);
    
        if (result === undefined) {
            //No match
            return false;
        }
        else {
            //Successfully logged in
            return true;
        }
}

exports.find = async() => {
    var sql = 'SELECT id, username FROM administrator'
    var params = [];
    return await db.dball(sql, params);
}

exports.findById = async(id) => {
    var sql = 'SELECT id, username FROM administrator WHERE id=?'
    var params = [id];
    return await db.dbget(sql, params);
}

exports.create = async(admin) => {
    var sql = 'INSERT INTO administrator (username, password_hash) VALUES (?,?);';
    var params = [admin.username, md5(admin.password)];
    return await db.dbrun(sql, params);
}

exports.update = async(administrator) => {
    var sql = 'UPDATE administrator SET username = ?, password_hash ? WHERE id = ?';
    var params = [ administrator.username, md5(administrator.password), administrator.id ];
    return await db.dbrun(sql, params);
}

exports.delete = async(id) => {
    var sql = 'DELETE FROM administrator WHERE id = ?;'
    var params = [id];   
    return await db.dbdelete(sql, params);
}