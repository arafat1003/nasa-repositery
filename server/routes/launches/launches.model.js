const launches = new Map()
let latestFlightNumber = 100;
const launcherMongo = require("./launcher.mongo")
const planets =require("../planets/planets.mongo")
const axios = require("axios")

const launch = {
    flightNumber:100,
    mission:"Kepler-296 fsds",
    rocket:"Cypher 212",
    target:"Kepler-296 f",
    launchDate:new Date("december 21 ,2030"),
    customers:["arafat","solar"],
  upcoming:true,
    success:true
}
async function newDataLunchFinder(link) {
   return await launcherMongo.findOne(link)
}
saveLaunch(launch)
const SPACE_X_API="https://api.spacexdata.com/v4/launches/query"
async function spacaexDatabase(){
    const response = await axios.post(SPACE_X_API,{
        query:{
        
        },
        
        options:{
            pagination:false,
            populate:[
                {
                    path:'rocket',
                    select:{
                        name:1
                    }
                },
               {
                path:'payloads',
                select:{
                    customers:1
                }
               }
            ]
        }
    })

    const LaunchDoc = response.data.docs

    for(const launchDocs of LaunchDoc){
         const payloads = launchDocs["payloads"]
         const customers = payloads.flatMap((payload)=>{
            return payload["customers"]
         })
        const launch ={
            flightNumber:launchDocs["flight_number"],
            mission:launchDocs["name"],
            launchDate:launchDocs["date_local"],
            rocket:launchDocs["rocket"]["name"],
            upcoming:launchDocs["upcoming"],
            success:launchDocs["success"],
            customers
        }
        console.log(`${launch.flightNumber}. ${launch.rocket}.${launch.mission}`)
        await saveLaunch(launch)
    }
   
}

async function newLoadData(){
    const spacedata =await newDataLunchFinder({
        flightNumber:1,
       rocket:"falcon 11"
    })
    if(spacedata){
        console.log("data have been already loaded")

    }
    else{
        spacaexDatabase()
    }
}



async function saveLaunch(launch){
   
await launcherMongo.findOneAndUpdate({
    flightNumber:launch.flightNumber
},launch,{
    upsert:true
})
}




async function getAlllauncherdata(skip,limit){
   return await launcherMongo.find({

   },{"_id":0,"__v":0})
   .sort({flightNumber:-1})
   .skip(skip)
   .limit(limit)
}

async function abortedById(launchId){
   return await launcherMongo.find({
    flightNumber:launchId
   })
}

async function NewflightNumber(){
  const latestNuber=  await launcherMongo.findOne()
    .sort("-flightNumber")

    if(!latestNuber){
        return latestFlightNumber
    }
    return latestNuber.flightNumber
}

async function addnewData(launch){
    const newflightNumbers = await NewflightNumber() +1

    let launcher = Object.assign(launch,{
        customers:["arafat","solar"],
        upcoming:true,
          success:true,
         
          flightNumber:newflightNumbers
    })

    await saveLaunch(launcher)
}
async function getAbortedbyId(launchId){
const aborted = await launcherMongo.updateOne({
flightNumber:launchId
},{
    success:false,
    upcoming:false
})

return aborted.ok ===1 && aborted.modified ===1
}

module.exports={
    newLoadData,
    getAlllauncherdata,
    addnewData,
    abortedById,
    getAbortedbyId,
   
}