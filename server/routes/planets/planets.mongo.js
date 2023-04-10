const mongoose =require("mongoose")

const hexaPlanets = new mongoose.Schema({
    keplerName:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model("planet",hexaPlanets)