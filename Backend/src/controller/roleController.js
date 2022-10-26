import roleApiService from "../service/roleApiService"
import apiUserService from "../service/apiUserService"
const readFunc = async (req, res) => {
    try {
        let data = await roleApiService.getAllRole();
        console.log("userControllder data", data);
        return res.status(200).json({
            message: data.message,
            errorcode: data.errorcode,
            data: data.data
        })

    }
    // let data = await apiUserService.getAllUser();
    // console.log("userControllder data",data);
    // return res.status(200).json({
    //     message:data.message,
    //     errorcode:data.errorcode,
    //     data: data.data
    // })

    catch (e) {
        console.log(8, e);
        return res.status(500).json({
            message: 'error',
            errorcode: -1,
            data: ''
        })
    }
}
const createFunc = async (req, res) => {
    try {
        let data = await roleApiService.createNewRole(req.body);
        // console.log(43,data.data);
        return res.status(200).json({
            message: data.message,
            errorcode: data.errorcode,
            data: data.data
        })

    }
    catch (e) {
        console.log(43, e);
        return res.status(500).json({
            message: 'error',
            errorcode: -1,
            data: ''
        })
    }
}
// const updateFunc = async(req, res) => {
//     try {
//         let data = await apiUserService.updateUser(req.body);
//             // console.log(43,data.data);
//             return res.status(200).json({
//                 message: data.message,
//                 errorcode: data.errorcode,
//                 data: data.data
//             })
//     }
//     catch (e) {
//         console.log(17, e);
//         return res.status(500).json({
//             message: 'error',
//             errorcode: -1,
//             data: ''
//         })
//     }
// }
const deleteFunc = async (req, res) => {
    try {
        // console.log("req.body=",req.body);
        let data = await roleApiService.deleteRole(req.body.id)
        return res.status(200).json({
            message: data.message,
            errorcode: data.errorcode,
            data: data.data
        })
    }
    catch (e) {
        console.log(81, e);
        return res.status(500).json({
            message: 'error',
            errorcode: -1,
            data: ''
        })
    }
}
const getRoleByGroup = async (req,res) => {
    try {
        // console.log("req.body=",req.body);
        let id=req.params.groupId
        let data=await roleApiService.getRoleByGroup(id)
        console.log(95,data);
        return res.status(200).json({
            message: data.message,
            errorcode: data.errorcode,
            data: data.data
        })
    }
    catch (e) {
        console.log(101, e);
        return res.status(500).json({
            message: 'error',
            errorcode: -1,
            data: ''
        })
    }
}
const assignToGroup=async(req,res)=>{
    try {
        // console.log("req.body=",req.body);
        let data=await roleApiService.assignToGroup(req.body.data)
        console.log(114,data);
        return res.status(200).json({
            message: data.message,
            errorcode: data.errorcode,
            data: data.data
        })
    }
    catch (e) {
        console.log(101, e);
        return res.status(500).json({
            message: 'error',
            errorcode: -1,
            data: ''
        })
    }
}
module.exports = { createFunc, readFunc, deleteFunc,getRoleByGroup,assignToGroup }