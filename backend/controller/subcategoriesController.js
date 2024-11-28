const sequelize = require("sequelize")
const db = require("../models")
const {imageupload} = require("../helpher/imageUpload");
const { update } = require("./userController");
const categories = require("../models/categories");
const users = require("../models/users");


db.subcategories.belongsTo(db.categories, {
    foreignKey: 'categories_id',  
    as: 'category'
});


module.exports={
    create:async(req, res)=>{
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image)
                    req.body.image = imageupload(image, "users");
            }
            const data = await db.subcategories.create({
                
                name:req.body.name,
                image:req.body.image,
                categories_id:req.body.categories_id
            })
            return res.json({
                status:200,
                message:"sub category added",
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },
    read:async(req, res)=>{
        try {
            const data = await db.subcategories.findAll({
                include: [{
                    model: db.categories,
                    as: "category"
                }],
                order: [['updatedAt', 'DESC']]
            })
            return res.json({
                status:200,
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },
    readone:async(req, res)=>{
        try {
            const data = await db.subcategories.findOne({where:{id:req.params.id}},{
                include: [{
                    model: db.categories,
                    as: "category"  
                }]
            })
            return res.json({
                status:200,
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },
    update:async(req, res)=>{
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image)
                    req.body.image = imageupload(image, "users");
            }
            const data = await db.subcategories.update({
                name:req.body.name,
                image:req.body.image,
                categories_id:req.body.categories_id},
            {where:{id:req.params.id}}
            )
            const updatedata = await db.subcategories.findOne({where:{id:req.params.id}})
            return res.json({
                status:200,
                message:"sub-category updated",
                body:updatedata
            })
        } catch (error) {
            console.log(error);
        }
    },
    delete:async(req,res)=>{
        try {
            const data = await db.subcategories.destroy({
                where:{id:req.params.id}
            })
            return res.json({
                status:200,
                message:"sub-category deleted",
            })
        } catch (error) {
            console.log(error);
        }
    }
}