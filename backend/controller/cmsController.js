const sequelize = require("sequelize")
const db = require("../models")
const { update } = require("./userController")
const { imageupload } = require("../helpher/imageUpload")

module.exports= {
    create:async(req, res)=>{
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image)
                    req.body.image = imageupload(image, "users");
            }
            const data = await db.cms.create({
                title:req.body.title,
                content:req.body.content,
                type:req.body.type,
                image:req.body.image
            })
            return res.json({
                status:200,
                message:"created",
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },
    read:async(req, res)=>{
        try {
            const data = await db.cms.findOne({
                where:{type:0} // terms & conditions
            })
            return res.json({
                status:200,
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },
    read1:async(req, res)=>{
        try {
            const data = await db.cms.findOne({
                where:{type:1} //Privacy Policy
            })
            return res.json({
                status:200,
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },
    read2:async(req, res)=>{
        try {
            const data = await db.cms.findOne({
                where:{type:2} //About Us
            })
            return res.json({
                status:200,
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },
    cmsterms:async(req, res)=>{
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image)
                    req.body.image = imageupload(image, "users");
            }
            const data = await db.cms.update({
                title:req.body.title,
                content:req.body.content,
                image:req.body.image
            },
            {where:{type:0},})

            return res.json({
                status:200,
                message:"updated",
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },
    cmsprivacypolicy:async(req, res)=>{
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image)
                    req.body.image = imageupload(image, "users");
            }
            const data = await db.cms.update({
                title:req.body.title,
                content:req.body.content,
                image:req.body.image
            },
            {where:{type:1},}
        )
            return res.json({
                status:200,
                message:"updated",
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },
    cmsaboutus:async(req, res)=>{
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image)
                    req.body.image = imageupload(image, "users");
            }
            const data = await db.cms.update({
            title:req.body.title,
            content:req.body.content,
            image:req.body.image
            },
            {where:{type:2},})
            return res.json({
                status:200,
                message:"updated",
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },
    delete0:async(req, res)=>{
        try {
            const data = await db.cms.delete({
                where:{type:0}
            })
            return res.json({
                status:200,
                message:"deleted",
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    }
}