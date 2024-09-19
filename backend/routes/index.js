var express = require('express');
var router = express.Router();
const user = require("../controller/userController")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/create",user.create)
router.get("/read/:id",user.read)
router.get("/readall",user.readAll)
router.put("/update/:id",user.update)
router.delete("/delete/:id",user.delete)
router.post("/changePassword",user.changePassword)

module.exports = router;
