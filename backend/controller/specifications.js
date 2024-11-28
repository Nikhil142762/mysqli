const sequelize = require("sequelize")
const db = require("../models")
const specifications = require("../models/specifications")
const products = require("../models/products")



module.exports={
create:async(req, res)=>{
    try {
        const data = await db.specs.create({
            product_id:req.body.product_id,
            product_size:req.body.product_size,
            product_price:req.body.product_price,
            product_quantity:req.body.product_quantity
        })        
        return res.json({
            status:200,message:"product specs added",body:data
        })
    } catch (error) {
        console.log(error);
    }
},
read:async(req, res)=>{
    try {
        const data = await db.specs.findAll()
        return res.json({status:200,message:"products specs found",body:data})        
    } catch (error) {
        console.log(error);
    }
},
readOne:async(req, res)=>{
    try {
        const data = await db.specs.findAll({
            where:{product_id:req.params.id}
        })        
        return res.json({status:200,body:data})
    } catch (error) {
        console.log(error);
    }
},

}
