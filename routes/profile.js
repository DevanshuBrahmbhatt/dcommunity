
const router = require("express").Router();
const passport = require("passport");
const conn=require('../config/database');



router.get('/',(req, res) => {

    userId=req.user;
 

conn.query('SELECT * FROM questions INNER JOIN profile on questions.p_id=profile.p_id  where authenticate=1 and google_id=?',userId, (err, result) => {
    

    if(err){

        console.log(err);
    }

    else{

        console.log(result);
         res.render("profile",{data:result});
        
    }
});


   
});



module.exports = router;