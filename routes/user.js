const express=require("express");
const router=express.Router()
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapasync.js");
const passport = require("passport");
const userController=require("../controller/user.js");
const{isLoggedIn}=require("../middleware.js");

router.route("/loginsignup")
.get(userController.renderSignupLogin);
router.route("/signup")
.get(userController.renderSignupForm)
.post(userController.signup);
router.route("/login")
.get(userController.renderLoginForm)
.post(userController.login); 
router.route("/profession")
.get( isLoggedIn, userController.renderProfession);
//forgot
// Show Forgot Password Page
router.route("/forgot")
.get(userController.renderForgotForm)
  // Handle Forgot Password Form Submission
.post(userController.forgot);
  // Show Verification Page
router.route("/verify")
.get(userController.renderVerifyForm)
  
  // Handle Verification Code Submission
.post(userController.verify);
  
  // Show Reset Password Page
router.route("/reset")
.get(userController.renderResetForm)
  
  // Handle Reset Password Submission
.post(userController.reset);
router.route("/successreset")
.get(userController.renderSuccessReset);
module.exports=router
router.route('/logout')
.get(userController.logout);
module.exports = router;