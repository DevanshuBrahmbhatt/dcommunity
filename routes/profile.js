
const router = require("express").Router();
const passport = require("passport");
const conn=require('../config/database');




function isAuth(req,res,next){

    
    userId=req.user;
 
    if(userId){

        // res.locals.user = req.user;
        // console.log("res.loca"+res.locals.user);

        
        return next();
    }
    else{

        res.redirect('/auth/google');
       
    }



}


router.get('/',isAuth,(req, res) => {

    userId=req.user;
 

conn.query('SELECT * FROM questions INNER JOIN profile on questions.p_id=profile.p_id  where authenticate=1 and google_id=?',userId, (err, result) => {
    

    if(err){

        console.log(err);
    }

    else{

         res.render("profile",{data:result});
        
    }
});


   
});



module.exports = router;