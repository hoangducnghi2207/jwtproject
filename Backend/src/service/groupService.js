import db from "../models/models"
const getGroup=async()=>{
    try{
        let data= await db.Group.findAll({
            order:[['name','DESC']]
        })
        return {
            message: "get group success",
            errorcode: 0,
            data: data
        }
    }
    catch(e){
        console.log(e);
        return({
            message:"serivce error",
            errorcode:1,
            data:[]
        })
    }
}
module.exports={
    getGroup
}