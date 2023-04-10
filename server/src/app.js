const express = require("express")
const api = require("../server/api")
const cors = require("cors")
const path = require("path")
const morgan =require("morgan")

const app = express()
app.use(express.json())

app.use("/v1",api)
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.static(path.join(__dirname,"..","public")))
app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})
app.use(morgan("combined"))
app

module.exports=app