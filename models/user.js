const mongoose = require('mongoose');
const passportLocalMongoose=require("passport-local-mongoose");
const userSchema=new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        username:String,
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        wishlist: {
          type: [
            {
              productId: mongoose.Schema.Types.ObjectId,
              category: String // 'laptop' or 'phone'
            }
          ],
          default: [] // This ensures it's an empty array by default
        },
          profileImage: {
            type: String,
            default: '/user-logo.svg' // Default profile image path
          }
    }
);

userSchema.plugin(passportLocalMongoose,{ usernameField: "email" });

module.exports = mongoose.model('User', userSchema);