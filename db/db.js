var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

let db = new sqlite3.Database("db/accesscontroller.db", (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }
    console.log('Connected to the SQLite database.')

    initTables().then(checkValidAdminAccount);
});

module.exports.db = db;

async function initTables() {
  return new Promise ((res,rej)=> {
    db.exec(
    `CREATE TABLE if not exists user (id INTEGER PRIMARY KEY, name TEXT UNIQUE NOT NULL,  phone TEXT, email TEXT, active BOOLEAN, keyholder BOOLEAN);
    CREATE TABLE if not exists rfid (id INTEGER PRIMARY KEY, user_id INTEGER, card_hash TEXT UNIQUE NOT NULL, description TEXT, active BOOLEAN);
    CREATE TABLE if not exists device (id INTEGER PRIMARY KEY, name TEXT UNIQUE NOT NULL, description TEXT, available BOOLEAN);
    CREATE TABLE if not exists permission (id INTEGER PRIMARY KEY, device_id INTEGER, user_id INTEGER);
    CREATE TABLE if not exists administrator (id INTEGER PRIMARY KEY, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL);
    CREATE TABLE if not exists log_event (id INTEGER PRIMARY KEY, datetime TEXT DEFAULT CURRENT_TIMESTAMP, source TEXT, type TEXT, message TEXT)`, (err)=>{
         
      if (err) {
        console.log("Error initialising tables - " + err)
        return rej(err);
      }
      //Resolve promise
      return res();
    });
  });
}

function checkValidAdminAccount() {
  db.all("SELECT COUNT (*) FROM administrator", [], (err, count)=> {
    if (err) {
      console.log("Error: Unable to check administrator table details")
      console.log(err);
    }
    if (count[0]["COUNT (*)"] === 0) {
      //If administrator table is empty:
      //NB FIXME What about salt?
      console.log("ERROR: No administrators exist, creating one: username administrator, password password");
      db.run(`INSERT INTO administrator (username, password_hash) VALUES ("administrator", "` + md5("password") + `");`);
    }
  });
}

//These are promise-based wrappers for the corresponding functions in sqlite3
module.exports.dbrun = async(sql, params) => {
  return new Promise((res, rej) => {
    db.run(sql, params, function(err, row)  {
      if (err) {
        console.log(err);
        return rej(err);
      }
      return res(this.lastID);
    })
});
}

module.exports.dbdelete = async (sql,params) => {
  return new Promise((res, rej) => {
    db.run(sql, params, function(err)   {
        if (err) {
            return rej(err);
        }
        return res(this.lastID);
      })
  });

}

module.exports.dball = async(sql, params) => {
  return new Promise((res, rej) => {
    db.all(sql, params, (err, rows)=> {
        if (err) {
            return rej(err);
        }
        return res(rows);
    })
});
}

module.exports.dbget = async(sql,params) => {
  return new Promise((res, rej)=> {
    db.get(sql, params, (err, row) => {
     if (err) {
          return rej(err);
      }        
      return res(row);
  });
  });
}
