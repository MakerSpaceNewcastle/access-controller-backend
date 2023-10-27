const jwt = require('jsonwebtoken');
const AdminModel = require("../models/admin");


/* Load .env file for config details */
const dotenv = require('dotenv');
dotenv.config();


const jwt_token_secret = process.env.JWT_TOKEN_SECRET
exports.generateToken = (name) => {
    return jwt.sign({username: name}, jwt_token_secret, { expiresIn: '4h' })
};

exports.authenticate = async (username, password) => {
    return AdminModel.authenticate(username, password);
}

exports.checkLoggedIn = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        //Not logged in
        return res.status(403).json({"message":"Not logged in"});
    }
    try {
        const data = jwt.verify(token, jwt_token_secret);
        //Attach a username to the req object so other pages can fish it out
        req.username = data.username;
        //Proceed to load the page
        return next();
    }
    catch (err) {
        return res.status(500).json({"message":"Internal error : " + err.message});
    }
  }
