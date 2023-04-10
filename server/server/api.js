const planetsRouter = require("../routes/planets/plants.routes")
const {getLaunchesRouter} = require("../routes/launches/launches.router")
const express = require("express")
const api = express.Router()

api.use("/planet",planetsRouter)
api.use("/launcher",getLaunchesRouter)

module.exports=api