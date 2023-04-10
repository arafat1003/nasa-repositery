const { model } = require("mongoose");


const CUSTOM_DEFAULT_PAGE = 1 ;
const CUSTOM_DEFAULT_LIMIT = 0;

async function pagination(query){
   const page = Math.abs(query.page) || CUSTOM_DEFAULT_PAGE;
   const limit = Math.abs(query.page) || CUSTOM_DEFAULT_LIMIT;
   const skip = (page-1)*limit

   return{
    page,
    limit,
    skip
   }
}
module.exports={
    pagination
}