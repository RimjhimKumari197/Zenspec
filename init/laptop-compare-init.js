const mongoose=require("mongoose");
const initdata=require("./laptop-compare-data.js");
const LaptopCompare=require("../models/laptop-compare.js");
main().then((res)=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Zenspec');

}

const initDB=async()=>{
    await LaptopCompare.deleteMany({});
    await LaptopCompare.insertMany(initdata.data);
    console.log("data initialized");
};
initDB();