const mysql = require("mysql2")
const jwt = require("jsonwebtoken")
const userModel = require("../models/users")
const db = require("../models")
const secretkey = "12345"

module.exports = {
    tokenGenerate:async(id)=>{
        try {
            const token = await jwt.sign({id:id},secretkey, { expiresIn: '1h' })
            const decode = await jwt.verify(token,secretkey)
            const time = Math.floor(Date.now() / 1000)
            const Time = await db.users.update({
                _id: decode._id
            }, 
            { 
            logintime: decode.iat, token: token }, 
            { new: true });
            return { token: token, logintime: time }
            } 
            catch (error) {
                console.log(error, "error")
            }
    },
    
    authenticateJWT: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, secretkey , async (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                const userInfo = await db.users.findOne({ where: { id: user.id, } });
                if (userInfo) {
                    req.user = user;
                    next();
                } else {
                    return res.status(400).json({ msg: "Please Login First" })
                }
            });
        } else {
            res.sendStatus(401);
        }
    },
    
    unixTimestamp: function () {
        var time = Date.now();
        var n = time / 1000;
        return (time = Math.floor(n));
    },
    
    checkLoginTime: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: "Authorization header is missing." });
            }    
            
            const parts = authHeader.split(" ");
            if (parts.length !== 2 || parts[0] !== "Bearer") {
                return res.status(401).json({ message: "Authorization header format is invalid." });
            }
            
            const token = parts[1]; // Retrieve the token after 'Bearer'
            const decoded = jwt.verify(token, "12345");
            
            const user = await db.users.findOne({ where: { id: decoded.id }, raw: true });
            if (!user) {
                return res.status(401).json({ message: "User not found." });
            }
            
            // Compare logintime from the request with the one stored in the database
            if (req.body.logintime !== user.logintime) {
                return res.status(401).json({
                    message: "Your session has expired, please log in again.",
                    redirect: "/login"
                });
            }
            
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Authentication failed",
                error: error.message
            });
        }
    }
    
}