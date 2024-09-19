const mysql = require("mysql2")
const jwt = require("jsonwebtoken")
const userModel = require("../models/users")
const db = require("../models/users")

module.exports = {
    tokenGenerate:async(id)=>{
        try {
            const secretkey = "12345"
            const token = await jwt.sign({id:id},secretkey)
            console.log("token",token);

            const decode = await jwt.verify(token,secretkey)
            console.log(decode);

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
            jwt.verify(token, "secret@123", async (err, user) => {
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
}