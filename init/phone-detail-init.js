const mongoose=require("mongoose");
const initdata=require("./phone-detail-data.js");
const PhoneProduct=require("../models/phone-product.js");
main().then((res)=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Zenspec');

}

const initDB=async()=>{
    await PhoneProduct.deleteMany({});
    await PhoneProduct.insertMany(initdata.data);
    console.log("data initialized");
};
initDB();