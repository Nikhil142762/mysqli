const sequelize = require("sequelize")
const db = require("../models")
const { imageupload } = require("../helpher/imageUpload")
const { create, update } = require("./userController")
const  subcategories = require("../models/subcategories")

db.categories.belongsTo(db.subcategories, {
    foreignKey: 'subcategory_id',  
    as: 'subcategory'
});

module.exports={
    create: async (req, res) => {
        try {
            console.log(req.files, "Image files uploaded");
    
            // Check if the image file is provided
            if (req.files && req.files.image && req.files.image.name) {
                const image = req.files.image;
                req.body.image = imageupload(image, "users");
            } else {
                console.log("No image uploaded");
            }
    
            // Create the category
            const data = await db.categories.create({
                name: req.body.name,
                image: req.body.image,
                subcategory_id: req.body.subcategory_id
            });
    
            console.log(data, "Category created successfully");
            return res.json({
                status: 200,
                message: "Category added",
                body: data
            });
        } catch (error) {
            console.error("Error in create function:", error);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },
    
    
    readone:async(req, res)=>{
        try {
            const data = await db.categories.findOne({where:{id:req.params.id}},{
                include: [{
                    model: db.subcategories,
                    as: "subcategory"  
                }]
        })
            // console.log(data);
            return res.json({
                status:200,
                body:data
            })
        } catch (error) {
            console.log(error);
        }
    },

    read:async(req, res)=>{
        try {
            const data = await db.categories.findAll({
                include: [{
                    model: db.subcategories,
                    as: "subcategory"  
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

    update:async(req, res)=>{
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image)
                    req.body.image = imageupload(image, "users");
            }
            const data = await db.categories.update({
                name:req.body.name,
                image:req.body.image,
                subcategory_id:req.body.subcategory_id
            },
                {where:{id:req.params.id}}
            )
            const updatedata = await db.categories.findOne({where:{id:req.params.id}})
            return res.json({
                staus:200,
                message:"category updated",
                body:updatedata
            })
        } catch (error) {
            console.log(error);
        }
    },

    delete:async(req, res)=>{
        try {
            const data = await db.categories.destroy({
                where:{id:req.params.id}
            })
            return res.json({
                status:200,
                message:"category deleted"
            })
        } catch (error) {
            console.log(error);
        }
    },
}