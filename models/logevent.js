var db = require('../db/db');

exports.find = async (startnum, endnum, device) => {
    console.log(device);
    
    let sql, params;
    if (device===undefined || device == "all") {
        sql = "SELECT * FROM log_event ORDER BY datetime(datetime) DESC LIMIT ? OFFSET ?";
        params =  [endnum-startnum, startnum];
    }
    else {
        sql = "SELECT * FROM log_event WHERE source = ? ORDER BY datetime(datetime) DESC LIMIT ? OFFSET ?";
        params =  [device, endnum-startnum, startnum];
    }
    return await db.dball(sql, params);
}

exports.count = async(device)=> {
    let sql,params;
    if (device === undefined || device == "all") {
        sql = "SELECT COUNT(*) AS count FROM log_event";
        params = [];
    }
    else {
        sql = "SELECT COUNT(*) AS count FROM log_event WHERE source = ?";
        params = [device];
    }
    let result = await db.dball(sql,params);
    return result[0];
}

exports.create = async (event) => {
    var sql = "INSERT INTO log_event (source, type, message) VALUES (?, ?, ?)"
    var params = [event.source, event.type, event.message]
    return await db.dbrun(sql, params);
}
