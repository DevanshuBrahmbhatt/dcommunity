
const router = require("express").Router();
// const conn=require('../config/database');




router.get('/',(req, res) => {

 
res.render("dev");

   
});



module.exports = router;