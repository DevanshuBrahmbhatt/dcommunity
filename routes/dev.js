
const router = require("express").Router();
// const conn=require('../config/database');




router.get('/',(req, res) => {

 res.locals.user=req.user;
res.render("dev");

   
});



module.exports = router;