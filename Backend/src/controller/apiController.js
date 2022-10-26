import loginRegisterService from "../service/loginRegisterService"
const testApi=(req,res)=>{
    return res.status(200).json(
        {
            message:"ok", data:"testapi"
        }
    )
}
const handleRegister=async(req,res)=>{
    try{
        //req.body: email, username,phone,password
        // console.log("checkbody",req.body);
        if(!req.body.email||!req.body.phone||!req.body.password){
            return res.status(200).json({
                message:'missing parameter',
                errorcode:-1,
                data:""
            })
        }
            //service: create user
        let data=await loginRegisterService.registerNewUser(req.body)
        // console.log("data:,",data);
        return res.status(200).json({
            message:data.message,
            errorcode:data.errorcode,
            data: ''
        })
        
    }catch(e){
        return res.status(500).json({
            message:'error',
            errorcode:-1,
            data:''
        })
    }
    
}
const handleLogin=async(req,res)=>{
    try{
       
        //req.body: email, username,phone,password
        // console.log("checkbody login",req.body);
        let data= await loginRegisterService.handleUserLogin(req.body)
        console.log(45,data)
        if(data && data.data && data.data.access_token){
        // console.log(45,data)
         //setcookie
        res.cookie("jwt",data.data.access_token, {httpOnly: true, maxAge: 9000000})
        // console.log(43,data);
        }
            return res.status(200).json({
                message:data.message,
                errorcode:data.errorcode,
                data:data.data
            })
       
            //service: create user
      
        
    }catch(e){
        console.log(e)
        return res.status(500).json({
            message:'error login',
            errorcode:-1,
            data:''
        })
    }
}
const handleLogOut=(req,res)=>{
    try{
        res.clearCookie("jwt")
        return res.status(200).json({
            message:'clear cookie done',
            errorcode:0,
            data:''
        })
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            message:'error logout',
            errorcode:-1,
            data:''
        })
    }
}
module.exports={testApi,handleRegister,handleLogin,handleLogOut}