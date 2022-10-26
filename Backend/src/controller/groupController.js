import groupService from "../service/groupService"
const readFunc = async (req, res) => {
    try {
        let data= await groupService.getGroup(req.body.id)
        return res.status(200).json({
            message: data.message,
            errorcode: data.errorcode,
            data: data.data
        })
    }
    catch (e) {
        console.log((e));
        return({
            message:"Controller Error",
            errorcode:1,
            data:[]
        })
    }
}
module.exports = { readFunc }