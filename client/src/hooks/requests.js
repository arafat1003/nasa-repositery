const APP_URL = "http://localhost:5000/v1"

async function httpGetPlanets() {
 const response = await fetch(`${APP_URL}/planet`)
 return await response.json()
}

async function httpGetLaunches() {
const response = await fetch (`${APP_URL}/launcher`)
const getLaunches =await response.json()
return getLaunches.sort((a,b)=>{
 return a.flightNumber-b.flightNumber
})

}

async function httpSubmitLaunch(launch) {
try{
  return await fetch(`${APP_URL}/launcher`,{
    method:"post",
  headers:{
    "content-type":"application/json"
  },
  body:JSON.stringify(launch)
  })
}
catch(err){
return{
  ok:false
}
}
}

async function httpAbortLaunch(id) {
 try{
  return await fetch(`${APP_URL}/launcher/${id}`,{
    method:"delete",
  })
 }catch(err){
  return{
    ok:false
  }
 }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};