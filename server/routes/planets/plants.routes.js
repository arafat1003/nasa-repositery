const express = require("express")
const {getPlanets} = require("./planets.controller")
const cors = require("cors")


const planetsRouter = express.Router()
planetsRouter.use(cors({
    origin:"http://localhost:3000"
}))

planetsRouter.get("/",getPlanets)

module.exports=planetsRouter