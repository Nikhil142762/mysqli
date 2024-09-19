const sequelize = require("sequelize")
const db = require("../models")
const bcrypt = require("bcrypt")
const saltRound = 10
const {tokenGenerate} = require("../middleware/jwtToken")
const {imageupload}  = require("../helpher/imageUpload")
const jwt = require("jsonwebtoken")
const mysql = require("mysql2")
module.exports={
    create:async(req, res, id)=>{
        try {

            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image)
                    req.body.image = imageupload(image, "users");
            }
            
            
            const hashPass = await bcrypt.hash(req.body.password,saltRound)
            const data = await db.users.create({
            name:req.body.name,
            email:req.body.email,
            password:hashPass,
            phone:req.body.phone,
            // role:req.body.role,
            address:req.body.address,
            image: req.body.image,
            })

             // Generate JWT token
        const secretkey = "12345";
        const token = await jwt.sign({ id: data._id }, secretkey); // Use data._id from the created user
        console.log("token", token);

        // Verify the token (optional, but left in the code for debugging)
        const decode = await jwt.verify(token, secretkey);
        console.log(decode);

        // Update the logintime and token for the created user
        const time = Math.floor(Date.now() / 1000); // Current timestamp

        const updatedRows = await db.users.update(
            { logintime: time, token: token }, // Set the fields to update
            { where: { id: data.id } } // Use 'id' to find the user
        );

        // Return the token and logintime  o
        return res.json({
            status: 200,
            message: "User created successfully",
            token: token,
            logintime: time,
            result: data,
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
    read:async(req, res)=>{
        try {
            const data = await db.users.findOne({
                where:{id:req.params.id}
            })
            return res.json({
                status:200,
                message:data,
            })
        } catch (error) {
            console.log(error);            
        }
    },
    readAll:async(req, res)=>{
        try {
            const data = await db.users.findAll({
                // where:{id:req.params.id}
            })
            return res.json({
                status:200,
                message:data,
            })
        } catch (error) {
            console.log(error);            
        }
    },
    update:async(req, res)=>{
        try {
            const hashPass = await bcrypt.hash(req.body.password,saltRound)
            console.log(hashPass);
            
            const data = await db.users.update({where:{id:req.params.id},
                name:req.body.name,
                email:req.body.email,
                password:hashPass,
                phone:req.body.phone,
                role:req.body.role,
                address:req.body.address
            })
            await db.users.save()
            const findData = await db.users.findOne({
                where:{id:req.params.id}
            }) 
           
            console.log(data);
            return res.json({
                status:200,
                message:"user updated",
                body:findData
            })
            
        } catch (error) {
            console.log(error);
        }
    },
    delete:async(req, res)=>{
        try {
            const data = await db.users.destroy({where:{id:req.params.id}})
            return res.json({
                status:200, 
                message:"user deleted"
            })
        } catch (error) {
            console.log(error);
        }
    },
    changePassword:async(req, res)=>{
        try {
            const password = req.body.password
            // console.log(password);
            
            const data = await db.users.findAll()

                return res.json({
                    message:"no user found",
                    data:data
                })
            
        } catch (error) {
            console.log(error);
        }
    }
}