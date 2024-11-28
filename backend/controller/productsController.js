const sequelize = require("sequelize")
const db = require("../models")
const { imageupload } = require("../helpher/imageUpload")
const { create, update } = require("./userController")
const categories = require("../models/categories")
const specifications = require("../models/specifications")
const specs = require("../models/specs")

db.products.belongsTo(db.categories, {foreignKey: 'category_id',as: 'category'});


module.exports={
    create: async (req, res) => {
        try {
            if (req.files && req.files.product_image) {
                const image = req.files.product_image;
                if (image) {
                    req.body.product_image = imageupload(image, "users"); 
                }
            }
            if (!req.body.category_id) {
                return res.status(400).json({ status: 400, message: "Category ID is required." });
            }
            const category = await db.categories.findOne({
                where: { id: req.body.category_id },
            })
            if (!category) {
                return res.status(404).json({ status: 404, message: "Category not found." });
            }
            const data = await db.products.create({
                product_name: req.body.product_name,
                product_details: req.body.product_details,
                product_image: req.body.product_image,
                category_id: req.body.category_id,
            });
            if(data){
                const specs = await db.specs.create({
                    product_id:data.id,
                product_size:req.body.product_size,
                product_price:req.body.product_price,
                product_quantity:req.body.product_quantity
                })
            }
            return res.json({ status: 200, message: "Product added", body: data, specification:specs });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    },
    
    read: async (req, res) => {
        try {
            const data = await db.products.findAll({
                include: [
                    {
                        model: db.categories,
                        as: "category",
                        include: [
                            {
                                model: db.subcategories, 
                                as: "subcategory",
                            },
                        ],
                    },
                    // {
                    //     model:db.specs,
                    //     as:"specs"
                    // }
                    
                ],
                order: [['updatedAt', 'DESC']]
            });
            return res.json({
                status: 200,
                message: "Products fetched successfully",
                body: data
            });            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },


    readone: async (req, res) => {
        try {
            const data = await db.products.findOne({where:{id:req.params.id}},{
                include: [{
                    model: db.categories,
                    as: "category"  
                },{
                    model: db.specs,
                    as: "specs"  
                }
            ]
            });
            return res.json({
                status: 200,
                message: "Products fetched successfully",
                body: data
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },

    update:async(req, res)=>{
        try {

            if(!req.body.category_id){
                return res.json({status:400,message:"Please provide category id"})
            }
            const category = await db.categories.findOne({
                where: { id: req.body.category_id },
            });
            const getproduct = await db.products.findOne({where:{id:req.params.id}})

            const data = await getproduct.update({
                product_name: req.body.product_name,
                // product_price: req.body.product_price,
                product_details: req.body.product_details,
                product_image: req.body.product_image,
                category_id: req.body.category_id ,
            },
                {where:{id:req.params.id}}
            )
            if(data){
                const specs = await db.specs.findOne({where:{product_id:data.id}})
                console.log(specs,"oooooooooo");
                const result = await specs.update({
                    product_size:req.body.product_size,
                    product_price:req.body.product_price,
                    product_quantity:req.body.product_quantity
                })

            }
            return res.json({
                status:200,
                message:"Product Updated",
                body:data,
                // asd:result
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    },
    delete:async(req, res)=>{
        try {
            const data = await db.products.destroy({where:{id:req.params.id}})
            return res.json({status:200,message:"product deleted"})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    },


   
}