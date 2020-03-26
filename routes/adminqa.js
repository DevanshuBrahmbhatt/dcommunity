
const router = require("express").Router();
const passport = require("passport");
const conn=require('../config/database');


router.get('/',(req, res) => {

 
 
res.render('admin');


   
});


router.post('/action',(req, res) => {

 var id=req.body.id;
    // console.log(id);
    var password=req.body.password;
req.session.ided=id;
console.log(req.session.ided);

    if(id=='admin1128' && password=='admin1234@1995'){

        res.render('adminview');
    }
    else{
 res.render('admin');
}
    
       
    });
    
    
    router.get('/questionauth',(req, res) => {


        if(req.session.ided!== undefined){
        

           conn.query('SELECT * FROM questions where authenticate=0',  (err, result) => {
         if(err){
        console.log(err);
            }
        else{
          res.render("adminquestion",{data:result});
        }

        });
    }else{

        res.redirect('/');

    }
        
});

 
router.get('/answerauth',(req, res) => {

    if(req.session.ided!== undefined){
        

    conn.query('SELECT * FROM answers where authenticate=0',  (err, result) => {
  if(err){
 console.log(err);
     }
 else{
   res.render("adminanswer",{data:result});
 }

 });
}


else{

    res.redirect('/');

}
    
});
        
        

        router.get('/authquestion/:id',(req, res) => {


            if(req.session.ided!== undefined){
        
                var id=req.params.id;
                conn.query('update questions set authenticate=1 where q_id=?',id,  (err, result) => {
                        if(err){
                        console.log(err);
                        }else{
                    res.redirect('/adminqa/questionauth');
                        }
                    });
                }else{

                    res.redirect('/');
            
                }
        });
             
        
        
        router.get('/authanswer/:id',(req, res) => {

            if(req.session.ided!== undefined){
        

            var id=req.params.id;
            conn.query('update answers set authenticate=1 where a_id=?',id,  (err, result) => {
                    if(err){
                    console.log(err);
                    }else{
                res.redirect('/adminqa/answerauth');
                    }
                });
            }else{

                res.redirect('/');
        
            }
    });
         
                    
    

module.exports = router;