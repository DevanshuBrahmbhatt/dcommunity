
const router = require("express").Router();
const express = require('express');
const passport = require("passport");
const conn=require('../config/database');
const app = express();





function isAuth(req,res,next){

    userId=req.user;
    console.log(userId)
 
    if(userId){


        conn.query('SELECT * FROM PROFILE where google_id=?',userId,(err,result)=>{
            if(err){
                console.log(err);
            }
        
                name=result[0].name;
                // console.log(name);
        
             });
        
        return next();
    }
    else{

        res.redirect('/auth/google');
       
    }



}




router.get('/:id',isAuth,(req,res)=>{

var q_id= req.params.id;
console.log(q_id);

conn.query('select * from questions where q_id=?',q_id,(err,result)=>{

        
    res.render("answer",{data:result});


});



});



router.get('/view/:id',(req,res)=>{

    var q_id= req.params.id;
    // console.log(q_id);


    // var sql= "SELECT * FROM questions INNER JOIN profile on questions.p_id=profile.p_id  WHERE questions.q_id=? ; SELECT * FROM answers INNER JOIN questions on answers.q_id=questions.q_id INNER JOIN profile on profile.p_id=questions.p_id WHERE answers.authenticate=1 AND answers.q_id=?  ";
   
   var sql= "SELECT * FROM answers INNER JOIN questions on answers.q_id=questions.q_id INNER JOIN profile on profile.p_id=questions.p_id WHERE answers.authenticate=1 AND answers.q_id=?  ";
        conn.query(sql,q_id,(err,result)=>{
    
        // console.log(sql);
        if(err){


            console.log(err);
        }else{
        res.render("question",{data:result});
       
         }
    
 });
    
    
    
    });
    

router.post('/add/:id',isAuth,(req,res)=>{

    var post = {
        answer: req.body.answer,
        q_id: req.params.id,
        ansname:name

        
    }


let sql='INSERT INTO answers set ?';
conn.query(sql,post,(err,result)=>{

        if(err){
            
            console.log(err);
            // res.send("error");
        
        }
        else{
        // console.log(result);

        res.redirect("/");

        }

        // res.send("Nothing work");



    });



});




    
    

   



module.exports = router;