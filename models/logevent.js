var db = require('../db/db');

exports.find = async (pagenum) => {
    var sql = "SELECT * FROM log_event ORDER BY datetime DESC LIMIT 5 OFFSET ?"
    var params = [pagenum * 5]
    return await db.dball(sql, params); 
}

exports.count = async()=> {
    var sql = "SELECT COUNT(*) AS count FROM log_event";
    var params = []
    let result = await db.dball(sql,params);
    //Rounded up page count
    result[0].count  = Math.ceil(result[0].count/5 );
    return result[0];
}

exports.create = async (event) => {
    var sql = "INSERT INTO log_event (datetime, source, type, message) VALUES (?, ?, ?, ?)"
    var params = [new Date().toUTCString(), event.source, event.type, event.message]
    return await db.dbrun(sql, params);
}
