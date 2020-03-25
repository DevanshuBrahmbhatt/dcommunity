
const router = require("express").Router();
const express = require('express');
const passport = require("passport");
const conn=require('../config/database');
const app = express();





function isAuth(req,res,next){

    userId=req.user;
    // console.log(userId)
 
    if(userId){


        conn.query('SELECT * FROM PROFILE where google_id=?',userId,(err,result)=>{
            if(err){
                console.log(err);
            }
        
                p_id=result[0].p_id;
                // console.log(p_id);
        
             });
        
        return next();
    }
    else{

        res.redirect('/auth/google');
       
    }



}



router.get('/',isAuth,(req,res)=>{


 

conn.query('SELECT * FROM PROFILE where google_id=?',userId,(err,result)=>{
if(err){
    console.log(err);
}
// console.log(result[0].p_id);



});


res.render('askquestion');


});




router.post('/add', isAuth,(req, res) => {
    
    

 
        var post = {
        question: req.body.question,
        p_id:p_id
        
        }
    conn.query('INSERT INTO questions set ?',post,(err,result)=>{
    
            if(err){
                
                console.log(err);
             
            
            }
            else{
            // console.log(result);
            res.redirect("/");

            }



    
        });
    
    




});
    
    

   



module.exports = router;