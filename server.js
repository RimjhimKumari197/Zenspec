const express=require("express");
const app=express();
const path=require("path");
const mongoose = require('mongoose');
const methodOverride=require("method-override");
const bodyParser = require("body-parser");
const axios = require('axios');
const ejsMate=require("ejs-mate");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const ExpressError=require("./utils/expresserror");
const passport=require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User=require("./models/user.js");
const user=require("./routes/user.js");
const flash=require("connect-flash");
const session=require("express-session");
const PhoneProduct=require("./models/phone-product.js");
const LaptopProduct=require("./models/laptop-product.js");
const PhoneCompare=require("./models/phone-compare.js");
const LaptopCompare=require("./models/laptop-compare.js");
const MongoStore = require("connect-mongo");
const{isLoggedIn}=require("./middleware.js");
const nodemailer = require('nodemailer');
const MONGO_URL='mongodb://127.0.0.1:27017/Zenspec';
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
require('dotenv').config();
main().then((res)=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);

}
const phones=["Motorola Moto G62 5G",
  "Xiaomi Redmi 13C 5G",
  "Realme Narzo N61",
  "Oppo A3x 5G",
  "Samsung Galaxy F06 5G",
  "vivo Y21",
  "Motorola Edge 50 Fusion",
  "vivo T4x",
  "CMF by Nothing Phone 1",
  "Samsung Galaxy M35 5G",
  "Realme P3 5G",
  "iQOO Z9 5G",
  "Nothing Phone 3a",
  "Motorola Edge 50 Neo",
  "iQOO Neo 10R",
  "OnePlus Nord 4",
  "Samsung Galaxy A35 5G",
  "Nothing Phone 3a Pro",
  "OnePlus 12R",
  "Samsung Galaxy S24 FE",
  "Samsung Galaxy S23",
  "Realme GT 6",
  "OnePlus 13R",
  "Motorola Edge 50 Ultra",
  "Samsung Galaxy S25",
  "Apple iPhone 16",
  "Samsung Galaxy S25 Ultra",
  "OnePlus 13",
  "Apple iPhone 16 Pro Max",
  "iQOO 13",
  "Samsung Galaxy Z Fold6",
  "Google Pixel 9 Pro XL",
  "Google Pixel 9",
  "Xiaomi 15",
  "Realme GT 7 Pro",
]
const laptops=["Samsung Galaxy Book 4 Pro",
  "Lenovo IdeaPad Slim 3",
  "Acer Predator Helios Neo 16",
  "Asus Vivobook 14 (X1402)",
  "Dell Inspiron 14 (5410)",
  "Asus Vivobook S 15 OLED",
  "Apple MacBook Air (M1)",
  "Samsung Galaxy Book 4",
  "Apple MacBook Air (M2)",
  "Asus Zenbook 14 (2025)",
  "Samsung Galaxy Book5 Pro",
  "Asus TUF Gaming F15 (2023)",
  "Dell Alienware m16 R2",
  "Apple MacBook Air (M4)",
  "Lenovo V110"
];
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true,              // allow cookies with cross-origin requests
}));
const multer = require('multer');


// Store in /public/uploads/ directory

const bcrypt = require('bcryptjs');
const Joi = require('joi');  // Optional: For validating password structure

// Example of password validation schema using Joi (you can adjust as per requirements)
const passwordSchema = Joi.string()
  .min(8)
  .max(20)
  .pattern(/(?=.*[a-z])/, 'lowercase')
  .pattern(/(?=.*[A-Z])/, 'uppercase')
  .pattern(/(?=.*\d)/, 'digit')
  .pattern(/(?=.*[!@#$%^&*])/, 'special character')
  .messages({
    'string.min': 'Password should be at least 8 characters long.',
    'string.max': 'Password should not be longer than 20 characters.',
    'string.pattern.base': 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  });
  app.use(session({
    secret: "mysecretcode",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      ttl: 7 * 24 * 60 * 60 // Session expires after 7 days
    }).on('error', (error) => {
      console.log("MongoStore error:", error);
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie will last 7 days
      httpOnly: true,
      sameSite: 'lax',  // Allows normal site navigation
      secure: false,    // Set to true only if you're using HTTPS (in production)
    }
  }));
  
  
  app.use(passport.initialize());
  app.use(passport.session()); // Must come after session()
  app.use(flash());
  
  passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));
  passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  
  
  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
  
    if (req.user) {
      res.locals.userWishlist = req.user.wishlist || [];
      console.log("Wishlist from middleware:", req.user.wishlist);
    } else {
      res.locals.userWishlist = [];
    }
  
    next();
  });
  app.use((req, res, next) => {
    console.log("====== SESSION DEBUG ======");
    console.log("Session ID:", req.sessionID);
    console.log("Session:", req.session);
    console.log("User:", req.user);
    console.log("===========================");
    next();
  }); 

app.use((req, res, next) => {
  res.locals.currentRoute = req.path.split('/')[1]; // "category", "pricetracker", etc.
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get("/home",async(req,res)=>{
  let phones=await PhoneProduct.find({trending:"yes"});
  let laptops=await LaptopProduct.find({trending:"yes"});

  res.render("home.ejs",{phones,laptops})
})
app.get("/category",(req,res)=>{
  res.render("category");
})
app.get("/category/phone", async (req, res) => {
  let page = parseInt(req.query.page) || 1; // Default to page 1
  let limit = 5; // 5 items per page
  let skip = (page - 1) * limit;

  try {
      
      let filter = {};
      let sortOption = {};

      const { Filter_brand, Filter_network, Filter_processor, Filter_display, Filter_os, sort, Filter_key_preference, Filter_profession_tag, min, max,sliderMin,sliderMax } = req.query;
      let selectedFilters = { Filter_brand, Filter_network, Filter_processor, Filter_display, Filter_os, Filter_key_preference, Filter_profession_tag, min, max,sliderMin,sliderMax  };

      // Convert comma-separated values into arrays for multiple selections
      Object.keys(selectedFilters).forEach(key => {
          if (key === "min" || key === "max" || key === "sliderMin" || key === "sliderMax") return;
      
          const value = selectedFilters[key];
          
          if (value) {
              if (Array.isArray(value)) {
                  filter[key] = { $in: value };
              } else {
                  selectedFilters[key] = value.split(",");
                  filter[key] = { $in: selectedFilters[key] };
              }
          }
      });
      
      

      // Apply price range filter
      if ((min && max) || (sliderMin && sliderMax)) {
          filter.Price = {}; // Create a price filter object
      
          if (min && max) {
              filter.Price.$gte = parseInt(min); // Greater than or equal to min price
              filter.Price.$lte = parseInt(max); // Less than or equal to max price
          } else if (sliderMin && sliderMax) {
              filter.Price.$gte = parseInt(sliderMin); // Greater than or equal to sliderMin
              filter.Price.$lte = parseInt(sliderMax); // Less than or equal to sliderMax
          }
      } else if (sliderMin) {
          filter.Price = { $gte: parseInt(sliderMin) }; // Show all products greater than or equal to sliderMin
      }
      

      // Sorting Logic
      if (sort === "low-high") sortOption.Price = 1;
      else if (sort === "high-low") sortOption.Price = -1;
      else if (sort === "newest") sortOption.Filter_release_date = -1;
      else if (sort === "rating") sortOption.Ratings = -1;
      
      // Fetch filtered and sorted phones from MongoDB
      const totalCount = await PhoneProduct.countDocuments(filter);
      const phones = await PhoneProduct.find(filter).sort(sortOption).skip(skip).limit(limit);
      res.render("phone-filter", { phones, selectedFilters, sort ,currentPage: page,
          totalPages: Math.ceil(totalCount / limit)});
  } catch (err) {
      console.log(err);
      res.send("Error fetching phones");
  }
});

app.get("/category/laptop", async (req, res) => {
  let page = parseInt(req.query.page) || 1; // Default to page 1
  let limit = 5; // 5 items per page
  let skip = (page - 1) * limit;

  try {
      
      let filter = {};
      let sortOption = {};

      const { Filter_brand,  Filter_processor, Filter_display, Filter_os, sort, Filter_key_pref, Filter_prof_tags, min, max,sliderMin,sliderMax } = req.query;
      let selectedFilters = { Filter_brand,Filter_processor, Filter_display, Filter_os, Filter_key_pref, Filter_prof_tags, min, max,sliderMin,sliderMax  };

      // Convert comma-separated values into arrays for multiple selections
      Object.keys(selectedFilters).forEach(key => {
          if (key === "min" || key === "max" || key === "sliderMin" || key === "sliderMax") return;
      
          const value = selectedFilters[key];
          
          if (value) {
              if (Array.isArray(value)) {
                  filter[key] = { $in: value };
              } else {
                  selectedFilters[key] = value.split(",");
                  filter[key] = { $in: selectedFilters[key] };
              }
          }
      });
      
      

      // Apply price range filter
      if ((min && max) || (sliderMin && sliderMax)) {
          filter.Price = {}; // Create a price filter object
      
          if (min && max) {
              filter.Price.$gte = parseInt(min); // Greater than or equal to min price
              filter.Price.$lte = parseInt(max); // Less than or equal to max price
          } else if (sliderMin && sliderMax) {
              filter.Price.$gte = parseInt(sliderMin); // Greater than or equal to sliderMin
              filter.Price.$lte = parseInt(sliderMax); // Less than or equal to sliderMax
          }
      } else if (sliderMin) {
          filter.Price = { $gte: parseInt(sliderMin) }; // Show all products greater than or equal to sliderMin
      }
      

      // Sorting Logic
      if (sort === "low-high") sortOption.Price = 1;
      else if (sort === "high-low") sortOption.Price = -1;
      else if (sort === "newest") sortOption.Filter_release_date = -1;
      else if (sort === "rating") sortOption.Rating = -1;
      
      // Fetch filtered and sorted phones from MongoDB
      const totalCount = await LaptopProduct.countDocuments(filter);
      const laptops = await LaptopProduct.find(filter).sort(sortOption).skip(skip).limit(limit);
      res.render("laptop-filter", { laptops, selectedFilters, sort ,currentPage: page,
          totalPages: Math.ceil(totalCount / limit),userWishlist: req.user.wishlist});
  } catch (err) {
      console.log(err);
      res.send("Error fetching phones");
  }
});

app.get("/category/phone/form",(req,res)=>{
  res.render("budgetselection");
})
app.get("/category/laptop/form",(req,res)=>{
  res.render("budgetselection");
})
app.get("/category/phone/productdetail",async(req,res)=>{
  const id = req.query.id;
  const phone=await PhoneProduct.findById(id);
  console.log(req.user);
  
  res.render("phone-detail",{phone,userWishlist:[]});
})
app.get("/category/laptop/productdetail",async(req,res)=>{
  const id = req.query.id;
  const laptop=await LaptopProduct.findById(id);
  res.render("laptop-detail",{laptop,userWishlist: req.user.wishlist||[]});
})
app.post("/compare/form",(req,res)=>{
  const{id1}=req.query;
  res.render("compare-form",{id1});
});
app.post("/compare",(req,res)=>{
  const { item1, item2 } = req.body;

  
  const isPhone1 = phones.includes(item1);
  
  const isPhone2 = phones.includes(item2);
  
  
  const isLaptop1 = laptops.includes(item1);
  const isLaptop2 = laptops.includes(item2);

  // Both phones
  if (isPhone1 && isPhone2) {
    return res.redirect(`/compare/phones?item1=${encodeURIComponent(item1)}&item2=${encodeURIComponent(item2)}`);
  }

  // Both laptops
  if (isLaptop1 && isLaptop2) {
    return res.redirect(`/compare/laptops?item1=${encodeURIComponent(item1)}&item2=${encodeURIComponent(item2)}`);
  }

});
app.get('/compare/phones', async(req, res) => {
  const { item1, item2 } = req.query;
  
  const phone1=await PhoneCompare.findOne({Product_name:item1});
  
  const phone2=await PhoneCompare.findOne({Product_name:item2});

  res.render('comparePhones', { phone1, phone2 });
});

app.get('/compare/laptops', async(req, res) => {
  const { item1, item2 } = req.query;
  const laptop1=await LaptopCompare.findOne({Product_name:item1});
  
  const laptop2=await LaptopCompare.findOne({Product_name:item2});
  res.render('compareLaptops', { laptop1, laptop2 });
});
app.post('/wishlist/toggle', async (req, res) => {
  const { productId, category } = req.body;
  const user = await User.findById(req.user._id);

  const index = user.wishlist.findIndex(item =>
    item.productId.toString() === productId && item.category === category
  );

  let action;
  if (index > -1) {
    user.wishlist.splice(index, 1);
    action = 'removed';
  } else {
    user.wishlist.push({ productId, category });
    action = 'added';
  }

  await user.save();
  res.json({ action });
});
app.get("/wishlist", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 5;

  const user = await User.findById(req.user._id);
  const wishlist = user.wishlist.reverse(); // optional: newest first

  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
  console.log(totalPages);
  console.log(wishlist.length);
  const currentItems = wishlist.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const laptopIds = currentItems.filter(i => i.category === "laptop").map(i => i.productId);
  const phoneIds = currentItems.filter(i => i.category === "phone").map(i => i.productId);

  const laptops = await LaptopProduct.find({ _id: { $in: laptopIds } });
  const phones = await PhoneProduct.find({ _id: { $in: phoneIds } });

  // merge data
  const products = currentItems.map(item => {
    const productData = item.category === "laptop"
      ? laptops.find(p => p._id.equals(item.productId))
      : phones.find(p => p._id.equals(item.productId));
  
    if (!productData) {
      console.log(`Missing product data for ID: ${item.productId} in category: ${item.category}`);
      return null; // <-- skip if not found
    }
  
    return {
      _id: item.productId,
      category: item.category,
      data: productData
    };
  }).filter(Boolean); // <-- remove null entries
  

  res.render("wishlist", {
    products,
    currentPage: page,
    totalPages,
    userWishlist: req.user.wishlist
  });
});
app.post('/phones/:id/review', async (req, res) => {
  const { comment, rating } = req.body;
  const phone = await PhoneProduct.findById(req.params.id);
  phone.reviews.push({
    user: req.user._id,
    username: req.user.username,
    rating,
    comment,
  });
  await phone.save();
  res.redirect(`/category/phone/productdetail?id=${req.params.id}`);
});
app.post('/phones/:id/review/:reviewId/edit',  async (req, res) => {
  const { comment, rating } = req.body;
  const phone = await PhoneProduct.findById(req.params.id);
  const review = phone.reviews.id(req.params.reviewId);
  if (review.user.equals(req.user._id)) {
    review.comment = comment;
    review.rating = rating;
    await phone.save();
  }
  res.redirect(`/category/phone/productdetail?id=${req.params.id}`);
});
app.post('/phones/:phoneId/review/:reviewId/delete', async (req, res) => {
  const { phoneId, reviewId } = req.params;

  await PhoneProduct.findByIdAndUpdate(phoneId, {
    $pull: { reviews: { _id: reviewId, user: req.user._id } }
  });

  res.redirect(`/category/phone/productdetail?id=${req.params.phoneId}`);
});
app.post('/laptops/:id/review', async (req, res) => {
  const { comment, rating } = req.body;
  const laptop = await LaptopProduct.findById(req.params.id);
  laptop.reviews.push({
    user: req.user._id,
    username: req.user.username,
    rating,
    comment,
  });
  await laptop.save();
  res.redirect(`/category/laptop/productdetail?id=${req.params.id}`);
});
app.post('/laptops/:id/review/:reviewId/edit',  async (req, res) => {
  const { comment, rating } = req.body;
  const laptop = await LaptopProduct.findById(req.params.id);
  const review = laptop.reviews.id(req.params.reviewId);
  if (review.user.equals(req.user._id)) {
    review.comment = comment;
    review.rating = rating;
    await laptop.save();
  }
  res.redirect(`/category/laptop/productdetail?id=${req.params.id}`);
});
app.post('/phones/:laptopId/review/:reviewId/delete', async (req, res) => {
  const { laptopId, reviewId } = req.params;

  await LaptopProduct.findByIdAndUpdate(laptopId, {
    $pull: { reviews: { _id: reviewId, user: req.user._id } }
  });

  res.redirect(`/category/phone/productdetail?id=${req.params.laptopId}`);
});
app.get('/search', async (req, res) => {
  const searchQuery = req.query.searchquery;

  try {
    // Search in Phones
    let product = await PhoneProduct.findOne({ product_name: new RegExp(searchQuery, 'i') });

    if (product) {
      return res.redirect(`/category/phone/productdetail?id=${product._id}`);
    }

    // If not found in phones, search in Laptops
    product = await LaptopProduct.findOne({ Product_name: new RegExp(searchQuery, 'i') });

    if (product) {
      return res.redirect(`/category/laptop/productdetail?id=${product._id}`);
    }

    // If not found at all
    return res.status(404).send('Product not found');

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send('Server error');
  }
});
app.get("/delete-wishlist",async(req,res)=>{
  const user = await User.findById(req.user._id);
  user.wishlist = [];
  await user.save();
  console.log("wishlist deleted");
})


app.get('/pricetracker',(req,res)=>{
  res.render("pricetracker");
});
app.get("/technews",(req,res)=>{
  res.render("technews")
});



app.get("/profilesettings",(req,res)=>{
  res.render("profile-setting");
});
const fs = require("fs");


app.post("/update-profile", isLoggedIn, async (req, res) => {
  try {
    const { firstname, lastname, email, password, base64Image } = req.body;
    let hashedPassword;

    if (password && password.trim() !== "") {
      const validationResult = passwordSchema.validate(password);

      if (validationResult.error) {
        req.flash("error", validationResult.error.details[0].message);
        return res.redirect("/profilesettings");
      }

      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      const currentUser = await User.findById(req.user._id);
      hashedPassword = currentUser.password;
    }

    const updateData = {
      firstname,
      lastname,
      email,
      username: firstname + " " + lastname,
      password: hashedPassword,
    };

    // Save base64 image if provided
    if (base64Image && base64Image.startsWith("data:image")) {
      const matches = base64Image.match(/^data:(image\/.+);base64,(.+)$/);
      const ext = matches[1].split("/")[1];
      const buffer = Buffer.from(matches[2], "base64");
      const filename = `${Date.now()}.${ext}`;
      const filePath = path.join(__dirname, "public/uploads", filename);

      fs.writeFileSync(filePath, buffer);
      updateData.profileImage = `/uploads/${filename}`;
    }

    await User.findByIdAndUpdate(req.user._id, updateData);
    req.flash("success", "Profile updated successfully.");
    return res.redirect("/profilesettings");
  } catch (err) {
    console.error("Update failed:", err);
    req.flash("error", "Failed to update profile.");
    return res.redirect("/profilesettings");
  }
});



app.get("/contactus",(req,res)=>{
  res.render("contactus")
})
app.post('/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  // ✅ Email Verification with Abstract API
  try {
      
      const verifyRes = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`);
      const isValid = verifyRes.data.deliverability === "DELIVERABLE";

      if (!isValid) {
          req.flash("error",'Invalid email address.');
          return res.redirect("/contactus");
      }
  } catch (error) {
      req.flash("error",'Email validation failed:', error.message);
      return res.redirect("/contactus");
  }

  // ✅ Send Email using Nodemailer
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
      tls: {
          rejectUnauthorized: false, // 👈 Allow self-signed certs
      },
  });
  
      const mailOptions = {
          from: email,
          to: process.env.EMAIL_USER,
          subject: `New Message from ${firstName} ${lastName}`,
          text: message,
      };

      await transporter.sendMail(mailOptions);
      return res.redirect("/thankyou");
  } catch (error) {
      req.flash("error",'Failed to send email:', error.message);
      return res.redirect("/contactus")
  }
});
app.get("/supportcontact",(req,res)=>{
  res.render("supportandcontact");
});
app.get("/termsandcondition",(req,res)=>{
  res.render("termsandcondition")
})
app.get("/thankyou",(req,res)=>{
  res.render("thankyou");
  })
app.get("/faq",(req,res)=>{
  res.render("faq");
  })
  app.get("/privacy",(req,res)=>{
    res.render("privacy");
  })
app.post('/submit-feedback', isLoggedIn, async (req, res) => {
  const userEmail = req.user.email; // works because usernameField is email
  const feedback = req.body.feedback;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use app password, NOT your Gmail password
      },
    });

    const mailOptions = {
      from: userEmail,
      to: process.env.EMAIL_USER, // Feedback sent to your email
      subject: 'New Feedback Received',
      text: `Feedback from ${userEmail}:\n\n${feedback}`,
    };

    await transporter.sendMail(mailOptions);
    req.flash("success",'Feedback sent successfully!');
    res.redirect("/thankyou")

  } catch (err) {
    console.error(err);
    req.flash("error",'Something went wrong. Please try again later.');
    res.redirect("/supportcontact");
  }
});


app.get("/chatbot",(req,res)=>{
   res.render("chatbot")
})
app.use("/",user);
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page not found"));
});

//error handling middle ware
app.use((err,req,res,next)=>{
    let{status=500,message="something went wrong"}=err;
    res.status(status).render("error.ejs",{message});
    // res.status(status).send(message);
});


app.listen(5000,(res,req)=>{
    console.log("app is listening");
})