const {getAllplanets} = require("../models/datacsv")


async function getPlanets(req,res){
res.status(200).json(await getAllplanets())
}

module.exports = {
    getPlanets
}