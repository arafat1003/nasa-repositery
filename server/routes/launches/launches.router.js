const express = require("express")
const {getALllauncher,newLaunches,getlauchesDelete}=require("./launcher.controller")


const getLaunchesRouter  = express.Router()

getLaunchesRouter.get("/",getALllauncher)
getLaunchesRouter.post("/",newLaunches)
getLaunchesRouter.delete("/:id",getlauchesDelete)

module.exports = {
    getLaunchesRouter
}