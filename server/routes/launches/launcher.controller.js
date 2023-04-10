
const { getAlllauncherdata,addnewData ,abortedById,getAbortedbyId} = require("./launches.model");
const {pagination,} = require("./query")

async function getALllauncher(req,res){
    const {skip,limit} = pagination(req.query)
    const launches = await getAlllauncherdata(skip,limit)
    return res.status(200).json(launches)


}
async function newLaunches(req,res){
const launch = req.body;
await addnewData(launch)
return res.status(201).json(launch)
}


function getlauchesDelete(req,res){
    const launchId = Number(req.params.id);
    if(!abortedById(launchId)){
        res.status(400).json({
            error:"the system has error"
        })
    }
    const aborted = getAbortedbyId(launchId)

    if(!aborted){
        return res.status(400).json({
            error:"server not found"
        })
    }
    res.status(201).json({
        ok:true
    })
    
}




module.exports ={
    getALllauncher,
    newLaunches,
    getlauchesDelete
}