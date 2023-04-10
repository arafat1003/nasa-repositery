const mongoose = require("mongoose")
const MONGO_URL ="mongodb+srv://arafatisawesome6:1310655785@cluster0.zbnbje2.mongodb.net/?retryWrites=true&w=majority"




mongoose.connection.once("open",()=>{
    console.log("Hello from the another world")
})
mongoose.connection.on("error",(err)=>{
    console.error(err)
})

async function mongoConnect(){
  await  mongoose.connect(MONGO_URL,{
      
    })
}
async function mongoDisconnect(){
    await mongoose.disconnect()
}
module.exports = {
    mongoConnect,
    mongoDisconnect
}