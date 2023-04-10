const {parse} = require("csv-parse");
const fs = require("fs")
const path = require("path")
const plants = require("../planets/planets.mongo");

const planetModule = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6;
  }
  

function Habitplanet(){
   
    return new Promise((resolve,reject)=>{
        fs.createReadStream(path.join(__dirname,".","data.csv"))
        .pipe(parse({
            comment:"#",
            columns:true
        
        }))
        .on('data',(data)=>{
            if(isHabitablePlanet(data)){
            //    await plants.create({
            //       keplerName:data.kepler_name
            //    })
            savePlanets(data)
            }
        })
        .on("error",(error)=>{
           console.log("error")
            reject(error)
        })
        .on("end",async()=>{
            const planetary = await getAllplanets()
            console.log(planetary.map((planet) => {
                return planet['keplername'];
              }));
              const planetModules=(await getAllplanets()).length
        console.log(`${planetModules} habitable planets found!`);
        resolve()
        });
    })
}

async function getAllplanets (){
    return plants.find({})
}

async function savePlanets(planet){
    try{
        await plants.updateOne({
            keplerName:planet.kepler_name
        },
        {
            keplerName:planet.kepler_name
        },{
            upsert:true
        })
    }catch(err){
        console.log(err)
    }
}

module.exports={
    Habitplanet,
    getAllplanets,
    planet:planetModule,
}