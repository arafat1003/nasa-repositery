const PORT  = process.env.PORT || 5000;
const app = require("./app")
const {Habitplanet} = require("../routes/models/datacsv")
const {mongoConnect} = require("../services/mongo")
const {newLoadData} = require("../routes/launches/launches.model")
require("dotenv").config()

console.log(PORT)

const http = require("http")

const server = http.createServer(app)



async function HTPRequest(){
  await mongoConnect()
    await Habitplanet()
    await newLoadData()
    server.listen(PORT,()=>{
        console.log(`listening to the ${PORT}`)
    })
}

HTPRequest()