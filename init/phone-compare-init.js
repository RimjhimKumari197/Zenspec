const mongoose=require("mongoose");
const initdata=require("./phone-compare-data.js");
const PhoneCompare=require("../models/phone-compare.js");
main().then((res)=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Zenspec');

}

const initDB=async()=>{
    await PhoneCompare.deleteMany({});
    await PhoneCompare.insertMany(initdata.data);
    console.log("data initialized");
};
initDB();