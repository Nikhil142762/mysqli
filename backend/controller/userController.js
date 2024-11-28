const sequelize = require("sequelize")
const db = require("../models")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { tokenGenerate, authenticateJWT, unixTimestamp } = require("../middleware/jwtToken")
const { imageupload } = require("../helpher/imageUpload")
const jwt = require("jsonwebtoken")
const mysql = require("mysql2")
const hashedPassword = require("password-hash");
const { Json } = require("sequelize/lib/utils");
const secretKey = "12345";

module.exports = {
    create: async (req, res, id) => {
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image)
                    req.body.image = imageupload(image, "users");
            }
            const time = Math.floor(Date.now() / 1000);
            const hashPass = await bcrypt.hash(req.body.password, saltRounds);
            const data = await db.users.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPass,
                phone: req.body.phone,
                address: req.body.address,
                image: req.body.image,
                logintime: time,
                otp: 0,
                is_verify: 0
            });
            const secretkey = "12345";
            const token = await jwt.sign({ id: data.id }, secretkey, { expiresIn: '1h' });
            const decode = await jwt.verify(token, secretkey);
            const updatedRows = await db.users.update({
                token: token,
                // updatedRows:data
            },
                { where: { id: data.id } });
            return res.json({
                status: 201,
                message: "User created successfully",
                token: token,
                logintime: time,
                body: data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: "Error occurred while creating user",
                error: error.message,
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Please enter email" });
            }
    
            if (!password) {
                return res.status(400).json({ message: "Please enter password" });
            }
    
            // Check if the user exists
            const user = await db.users.findOne({ where: { email }, raw: true });
            if (!user) {
                return res.status(400).json({ message: "User not found. Please provide correct email and password" });
            }
    
            // Compare passwords
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ message: "Incorrect password, please try again" });
            }
    
            // Generate OTP and JWT token
            const otp = Math.floor(1000 + Math.random() * 9000);
            const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    
            // Update user with login time and OTP
            const loginTime = Date.now();
            await db.users.update({ logintime: loginTime, otp, is_verify: 0 }, { where: { id: user.id } });
    
            // Fetch updated user details
            const updatedUser = await db.users.findOne({ where: { id: user.id }, raw: true });
    
            return res.json({
                status: 200,
                message: "User authenticated successfully",
                user: updatedUser,
                token,
                logintime: updatedUser.logintime,
            });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    
    
    verifyotp: async (req, res) => {
        try {
            const { phone, otp } = req.body
            if (!phone) {
                return res.json({ status: 400, message: "please enter a phone number" })
            }
            if (!otp) {
                return res.json({ status: 400, message: "please enter a otp" })
            }
            const data = await db.users.findOne({ where: { phone: phone }, raw: true })
            if (data) {
                if (data.otp != otp) {
                    return res.json({ message: "otp is not valid", status: 400 })
                }
                else if (data.otp == otp) {
                    const updateuser = await db.users.update({
                        otp: 0,
                        is_verify: 1
                    }, { where: { phone: data.phone } })
                    return res.json({ message: "otp verified ", status: 200, body: data, updateuser: updateuser })
                }
            }
        } catch (error) {
            console.log(error);
        }
    },

    resendotp: async (req, res) => {
        try {
            const { phone } = req.body
            const data = await db.users.findOne({ where: { phone: phone } })
            if (!data) {
                return res.json({
                    status: 400,
                    message: "phone no. is not valid"
                })
            }
            if (phone == data.phone) {
                const otp = Math.floor(Math.random() * 9000)
                const dataa = await db.users.update({
                    otp: otp,
                    is_verify: 0
                },
                    { where: { phone: data.phone } }
                )
                return res.json({
                    status: 200,
                    message: "otp resend successful",
                    otp: dataa.otp
                })
            }
        } catch (error) {
            console.log(error);
        }
    },

    read: async (req, res) => {
        try {
            const data = await db.users.findOne({
                where: { id: req.params.id }
            })
            return res.json({
                status: 200,
                body: data,
            })
        } catch (error) {
            console.log(error);
        }
    },

    readall: async (req, res) => {
        try {
            const data = await db.users.findAll({
                order: [['updatedAt', 'DESC']]
            })

            return res.json({
                status: 200,
                body: data,
            })
        } catch (error) {
            console.log(error);
        }
    },

    update: async (req, res) => {
        try {
            // const hashPass = await bcrypt.hash(req.body.password, saltRounds)
            const data = await db.users.update({
                name: req.body.name,
                email: req.body.email,
                // password: hashPass,
                phone: req.body.phone,
                address: req.body.address,
            }, {
                where: { id: req.params.id }
            })
            const updatedata = await db.users.findOne({ where: { id: req.params.id } })
            // console.log(data);
            return res.json({
                status: 200,
                body: updatedata
            })
        } catch (error) {
            console.log(error);
        }
    },

    delete: async (req, res) => {
        try {
            const data = await db.users.destroy({ where: { id: req.params.id } })
            return res.json({
                status: 200,
                message: "user deleted"
            })
        } catch (error) {
            console.log(error);
        }
    },

    changePassword: async (req, res) => {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword, confirmPassword } = req.body;
            if(!oldPassword){
                return res.json({status:400,message:"Please enter your old password"})
            }
            if(!newPassword){
                return res.json({status:400,message:"Please enter your new password"})
            }
            if(!confirmPassword){
                return res.json({status:400,message:"Please enter confirm password"})
            }
            else{
            // console.log('Old password from request body:', oldPassword);
            const user = await db.users.findOne({
                where: { id: id },
                raw: true
            });
            if (user && user.password) {
                const storedHashedPassword = user.password;
                // console.log('Stored hashed password:', storedHashedPassword);
                const isPasswordMatch = await bcrypt.compare(oldPassword, storedHashedPassword);
                if (!isPasswordMatch) {
                    return res.status(400).json({ message: "Old password does not match" });
                }
                if (newPassword !== confirmPassword) {
                    return res.status(400).json({ message: "New password and confirm password do not match" });
                }
                const isNewPasswordSameAsOld = await bcrypt.compare(newPassword, storedHashedPassword);
                if (isNewPasswordSameAsOld) {
                    return res.status(400).json({ message: "New password cannot be the same as the old password" });
                }
                const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
                await db.users.update(
                    { password: hashedNewPassword },
                    { where: { id: id } }
                );
                return res.status(200).json({ message: "Password successfully updated" });
            } else {
                return res.status(404).json({ message: "User not found or password is missing" });
            }
        }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    updateProfile: async (req, res) => {
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image)
                    req.body.image = imageupload(image, "users");
            }
            const data = await db.users.update({
                name: req.body.name,
                image: req.body.image,
                phone: req.body.phone,
                address: req.body.address,
            },
                { where: { id: req.params.id } }
            )
            const updatedUser = await db.users.findOne({ where: { id: req.params.id } });

            return res.json({
                status: 200,
                message: "user profile updated",
                body: updatedUser
            })
        } catch (error) {
            console.log(error);
        }
    },

    notificationStatus: async (req, res) => {
        try {
            const { notificationStatus } = req.body
            const value = JSON.parse(JSON.stringify(v));
            const errorResponse = await helper.checkValidation(v);
            if (errorResponse) {
                return helper.failed(res, errorResponse);
            }
            await userModel.updateOne(
                { _id: req.user._id },
                { notificationStatus: req.body.notificationStatus }
            );
            let detail_user = await userModel.findById({ _id: req.user._id });
            return helper.success(res, "Notification Status Updated Sucessfully", detail_user);
        } catch (error) {
            console.log(error, "error");
            return helper.failed(res, error)
        }
    },

    statusChange: async (req, res) => {
        try {
            const { id, currentStatus } = req.body
            const user = await db.users.findOne({
                where: { id },
                attributes: ["id", "name", "status"]
            })
            if (!user) {
                return res.json({ status: 400, message: "user not found" })
            }
            const newStatus = currentStatus === 0 ? 1 : 0;
            await  user.update({status:newStatus})
            return res.json({
                id:user.id,
                name:user.name,
                status:newStatus,
                statustext:newStatus===0 ? "inactive" : "active"
            })
        } catch (error) {
            console.log(error);
        }
    }



}