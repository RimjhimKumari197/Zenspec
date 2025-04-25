const User=require("../models/user.js");
const passport = require("passport");
const crypto = require("crypto");
const transporter = require("../config/nodemailer");
const PasswordValidator = require('password-validator');
const axios = require('axios');
const schema = new PasswordValidator();

schema
  .is().min(8)                                   // Minimum length 8
  .is().max(20)                                  // Maximum length 20
  .has().uppercase()                             // Must have at least one uppercase letter
  .has().lowercase()                             // Must have at least one lowercase letter
  .has().symbols()                               // Must include at least one special character
  .has().not().spaces();                         // Should not have spaces

module.exports.renderSignupLogin=(req,res)=>{
    res.render("user/logsign");
}
module.exports.renderSignupForm=(req,res)=>{
    res.render("user/signup");
}
module.exports.signup=async(req,res)=>{
    try {
        let{firstname,lastname,email,password}=req.body;
        username=firstname+" "+lastname
    const newUser=new User({
            email,
            username,
            firstname,
            lastname
        });
        // Verify email using AbstractAPI
        
        const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`);

        // Check API response
        if (response.data.deliverability !== "DELIVERABLE") {
            req.flash("error", "Invalid email address! Please enter a real email.");
            return res.redirect("/signup");
        }
        // Check if the password is strong
        let validationResult = schema.validate(password, { list: true });

        if (validationResult.length > 0) {
            // Generate a feedback message for the user
            const suggestions = {
                min: "Password should be at least 8 characters long.",
                max: "Password should not be longer than 20 characters.",
                uppercase: "Password should contain at least one uppercase letter.",
                lowercase: "Password should contain at least one lowercase letter.",
                symbols: "Password should include at least one special character.",
                spaces: "Password should not contain spaces."
            };

            let errorMessages = validationResult.map(rule => suggestions[rule]).join(" ");

            req.flash("error", errorMessages);
            return res.redirect("/signup");
        }
        let existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            req.flash("error", "Email already exists. Try logging in!");
            return res.redirect("/login");
        }

    let registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
   
    req.login(registeredUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success","user registered successfully");
        res.redirect("/profession");
    });
    
        
    } catch (error) {
        req.flash("error",error.message);
        res.redirect("/signup");
    }
    
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("user/login");
}
module.exports.login=(req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next("login",err);
  
      if (!user) {
        req.flash('error', 'Email or password is incorrect'); 
        return res.redirect('/login'); 
      }
  
      req.logIn(user, (err) => {
        if (err) return next(err);
        req.flash("success","You are logged in successfully")
        return res.redirect("/profession"); 
      });
    })(req, res, next);
  };
module.exports.renderProfession=(req, res) => {
  console.log('Session:', req.session);
  console.log('Is Authenticated:', req.isAuthenticated());
  console.log('User:', req.user);
    res.render("filter/profession", { user: req.user });
  }
  module.exports.renderForgotForm= (req, res) => {
    res.render("user/forgot");
  }
  module.exports.forgot=async (req, res) => {
      try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          req.flash("error", "No account with that email found.");
          return res.redirect("/forgot");
        }
    
        // Generate a random 6-digit verification code
        const verificationCode = crypto.randomInt(100000, 999999).toString();
    
        // Store the token & expiration in the database
        user.resetPasswordToken = verificationCode;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes
        await user.save();
    
        // Send Email
        const mailOptions = {
          to: user.email,
          from: process.env.EMAIL_USER,
          subject: "Password Reset Verification Code",
          text: `Your password reset verification code is: ${verificationCode}`,
        };
    
        await transporter.sendMail(mailOptions);
    
        req.flash("success", "A verification code has been sent to your email.");
        res.redirect(`/verify?email=${user.email}`);
      } catch (err) {
        console.log(err);
        req.flash("error", `"${err.message}"`);
        res.redirect("/forgot");
      }
    }
module.exports.renderVerifyForm=(req, res) => {
    res.render("user/verify", { email: req.query.email });
  }
module.exports.verify=async(req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
        resetPasswordToken: req.body.code,
        resetPasswordExpires: { $gt: Date.now() }, // Check if token is valid
      });
  
      if (!user) {
        req.flash("error", "Invalid or expired verification code.");
        return res.redirect(`/verify?email=${req.body.email}`);
      }
  
      // Verification successful, redirect to reset password page
      req.flash("success", "Verification successful. Set a new password.");
      res.redirect(`/reset?email=${user.email}`);
    } catch (err) {
      req.flash("error", "Something went wrong.");
      res.redirect(`/verify?email=${req.body.email}`);
    }
  }
module.exports.renderResetForm=(req, res) => {
    res.render("user/reset", { email: req.query.email });
  }
module.exports.reset=async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        req.flash("error", "No account with that email found.");
        return res.redirect("/forgot");
      }
  
      if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Passwords do not match.");
        return res.redirect(`/reset?email=${req.body.email}`);
      }
  // Validate password strength
  const validationResult = schema.validate(req.body.password, { list: true });

  if (validationResult.length > 0) {
      const suggestions = {
          min: "Password should be at least 8 characters long.",
          max: "Password should not be longer than 20 characters.",
          uppercase: "Password should contain at least one uppercase letter.",
          lowercase: "Password should contain at least one lowercase letter.",
          symbols: "Password should include at least one special character.",
          spaces: "Password should not contain spaces.",
      };

      const errorMessages = validationResult.map(rule => suggestions[rule]);
      req.flash("error", errorMessages.join(" "));
      return res.redirect(`/reset?email=${req.body.email}`);
  }

      // Reset the password
      await user.setPassword(req.body.password);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      req.flash("success", "Password successfully reset. Please log in.");
      res.redirect("/successreset");
    } catch (err) {
      req.flash("error", "Something went wrong.");
      res.redirect(`/reset?email=${req.body.email}`);
    }
  }
  module.exports.renderSuccessReset=(req,res)=>{
    res.render("user/afterreset");
  }
  module.exports.logout=(req, res) => {
    req.logout((err)=>{
      if(err){
          console.log(err);
      }
      req.flash("success","you are logged out");
      res.redirect("/")
  })
}
  
  