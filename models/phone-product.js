const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const phoneProductSchema = new mongoose.Schema({
  trending:String,
  reviews: [reviewSchema],
  product_name: String,
  Ratings: Number,
  Price: Number,
  Technology: String,
  Announced: String,
  Status: String,
  Dimensions: String,
  Weight: String,
  Build: String,
  Sim: [String],
  Water_Dust_proofing: String,
  Display_type: String,
  Size: String,
  Resolution: [String],
  Protection: String,
  Always_on_display: String,
  OS: String,
  Chipset: String,
  CPU: String,
  GPU: String,
  Card_slot: String,
  Internal: String,
  Rom_type: [String],
  Back_camera_setup: String,
  Back_camera_setup_info: [String],
  Back_features: String,
  Back_video: String,
  Front_camera_setup: String,
  Front_camera_setup_info: String,
  Front_features: String,
  Front_video: String,
  Sound_loudspeaker: String,
  Jack: String,
  Wireless_DAC: String,
  WLAN: String,
  Bluetooth: String,
  Positioning: String,
  NFC: String,
  Infrared_port: String,
  Radio: String,
  USB: String,
  Sensors: String,
  Batter_type: String,
  Charging: [String],
  Shades: String,
  AnTuTu: String,
  GeekBench: String,
  Mark_three_d: String,
  Test_display: String,
  Test_loudspeaker: String,
  Battery_life: String,
  Pros: [String],
  Cons: [String],

  // Filters
  Filter_brand: String,
  Filter_network: String,
  Filter_processor: String,
  Filter_display: String,
  Filter_os: String,
  Filter_release_date: Date,
  Filter_key_preference: [String],
  Filter_profession_tag: [String],

  // Highlight info for filters
  Product_filter_display: String,
  Product_filter_camera: String,
  Product_filter_battery: String,
  Product_filter_processor: String,
  product_filter_warranty: String,

  // Links
  Amazon_link: String,
  Flipkart_link: String,
  Youtube_review_link: String,
  Product_track_link: String,
  wishlist: {
    type: String,
    enum: ["yes", null],
    default: null
  },
  Imgurl:String,
});

module.exports = mongoose.model('PhoneProduct', phoneProductSchema);
