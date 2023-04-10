const mongoose = require("mongoose")

const hexaMongoose = new mongoose.Schema({
    flightNumber:{
        type:Number,
        required:true
    },
    mission:{
        type:String,
        required:true

    },
    rocket:{
        type:String,
        required:true

    },
    target:{
        type:String,
        

    },
    launchDate:{
        type:Date,
        required:true

    },
    customers:[String]

    ,
    upcoming:{
        type:Boolean,
       

    },
    success:{
        type:Boolean,
       
    }
})

module.exports=mongoose.model("Launch",hexaMongoose)