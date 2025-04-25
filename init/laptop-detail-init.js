const mongoose=require("mongoose");
const initdata=require("./laptop-detail-data.js");
const laptopProduct=require("../models/laptop-product.js");
main().then((res)=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Zenspec');

}

const initDB=async()=>{
    await laptopProduct.deleteMany({});
    await laptopProduct.insertMany(initdata.data);
    console.log("data initialized");
};
initDB();