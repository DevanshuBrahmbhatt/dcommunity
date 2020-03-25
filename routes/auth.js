const router = require("express").Router();
const passport = require("passport");
const conn=require('../config/database');

router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

router.get("/logout", (req, res) => {
  
  req.session.destroy();
  // conn.end();
  res.redirect('/');


});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get("/google/redirect/", passport.authenticate("google"), (req, res) => {
 
res.redirect("/");

});

module.exports = router;
