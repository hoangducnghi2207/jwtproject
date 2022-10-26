import apiUserService from "../service/apiUserService"
const readFunc = async (req, res) => {
    try {
        if(req.query.page && req.query.limit){
            let page=req.query.page
            let limit =req.query.limit
            let data = await apiUserService.getUserWithPagination(+page,+limit);
            console.log(8,data);
            return res.status(200).json({
                message: data.message,
                errorcode: data.errorcode,
                data: data.data
            })
        }
        else{
            let data = await apiUserService.getAllUser();
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
    }
    catch (e) {
        console.log(8, e);
        return res.status(500).json({
            message: 'error',
            errorcode: -1,
            data: ''
        })
    }
}
const createFunc =async (req, res) => {
    try {
         let data = await apiUserService.createUser(req.body);
            // console.log(43,data.data);
            return res.status(200).json({
                message: data.message,
                errorcode: data.errorcode,
                data: data.data
            })
        
    }
    catch (e) {
        console.log(17, e);
        return res.status(500).json({
            message: 'error',
            errorcode: -1,
            data: ''
        })
    }
}
const updateFunc = async(req, res) => {
    try {
        let data = await apiUserService.updateUser(req.body);
            // console.log(43,data.data);
            return res.status(200).json({
                message: data.message,
                errorcode: data.errorcode,
                data: data.data
            })
    }
    catch (e) {
        console.log(17, e);
        return res.status(500).json({
            message: 'error',
            errorcode: -1,
            data: ''
        })
    }
}
const deleteFunc = async (req, res) => {
    try {
            // console.log("req.body=",req.body);
            let data=await apiUserService.deleteUser(req.body.id)
            return res.status(200).json({
                message: data.message,
                errorcode: data.errorcode,
                data: data.data
            })
    }
    catch (e) {
        console.log(17, e);
        return res.status(500).json({
            message: 'error',
            errorcode: -1,
            data: ''
        })
    }
}
const getUserAccount=async(req,res)=>{
    console.log("check user 99",req.user,req.token);
    return res.status(200).json({
        message: 'ok',
        errorcode: 0,
        data: {
            access_token:req.token,
            groupWithRole:req.user.role,
            email:req.user.email,
            username:req.user.username
        }
    })
}
module.exports = { readFunc, createFunc, updateFunc, deleteFunc,getUserAccount }