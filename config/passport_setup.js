const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const conn=require('./database');


passport.serializeUser((user, done) => {

    done(null, user.id);
  
});

passport.deserializeUser((id,done)=>{

    
    conn.query('SELECT * FROM profile WHERE google_id=?',id,(err,response,meta)=>{
       console.log(id);
        done(null,id)
    });

});

passport.use(
    new GoogleStrategy({

        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL:  "/auth/google/redirect"

    },  (accessToken, refreshToken, profile, done) => {



        
         var name =profile._json.name;
         var id=profile.id;
         var picture=profile._json.picture;
         


        conn.query("select * from profile where google_id=?",id,(err,response,meta)=>{

                if(response[0]){
                    // console.log(profile);
                    // console.log("aready exists");
                    done(null, profile);
                    

                }

                else if(err){

                    console.log(err);
                }


                else{


                    conn.query("Insert into profile (name,google_id,picture)  values(?,?,?)",[name,id,picture],(err,result)=>{

                            if(err){
                                console.log(err);
                            }
                            else{
 
                                done(null, {"name":name,"google_id":id,"picture":picture,"token":accessToken});
                                                          
                            }

                    });
                }


        });


    })
)

