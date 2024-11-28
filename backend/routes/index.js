var express = require('express');
var router = express.Router();
const user = require("../controller/userController")
const {authenticateJWT,checkLoginTime}  = require("../middleware/jwtToken")
const cms = require("../controller/cmsController")
const categories = require("../controller/categoriesController")
const subcategories = require("../controller/subcategoriesController");
const products = require('../controller/productsController');
const otp = require("../controller/userController")
const specifications = require("../controller/specifications")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// user controller //
router.post("/create",user.create)
router.post("/login",user.login)
router.get("/read/:id",user.read)
router.get("/readall",user.readall)
router.put("/update/:id",user.update)
router.delete("/delete/:id",user.delete)
router.post("/changePassword/:id",user.changePassword)
router.post("/updateProfile/:id",user.updateProfile)
router.post("/statuschange",user.statusChange)

// cms controller //
router.post("/createe",cms.create)
router.get("/findterms",cms.read) // terms & conditions
router.get("/findprivacy",cms.read1) // privacy policy
router.get("/findabout",cms.read2) // about us
router.put("/termsconditions",cms.cmsterms) 
router.put("/privacypolicy",cms.cmsprivacypolicy)
router.put("/aboutus",cms.cmsaboutus)

// categories controller //
router.post("/addcategories",categories.create)
router.get("/getallcategories",categories.read)
router.get("/getcategories/:id",categories.readone)
router.put("/updatecategories/:id",categories.update)
router.delete("/deletetecategories/:id",categories.delete)

// sub-category controller //
router.post("/addsubcategories",subcategories.create)
router.get("/getsubcategories",subcategories.read)
router.get("/getsubcategory/:id",subcategories.readone)
router.put("/updatesubcategories/:id",subcategories.update)
router.delete("/deletesubcategories/:id",subcategories.delete)

// products controller //
router.post("/addproduct",products.create)
router.get("/getproducts",products.read)
router.get("/getproduct/:id",products.readone)
router.put("/updateproduct/:id",products.update)
router.delete("/deleteproduct/:id",products.delete)


router.post("/otp",user.verifyotp)
router.post("/resendotp",user.resendotp)


router.post("/addspecification",specifications.create)
router.get("/readspecs/:id",specifications.readOne)
router.get("/readallspecs",specifications.read)

module.exports = router;
