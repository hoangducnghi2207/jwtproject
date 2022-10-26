import  express from "express";
import homeController from "../controller/homeController"
import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from "../controller/groupController"
import roleController from "../controller/roleController"
import {checkUserJwt,checkUserPermission} from "../middleware/jwtAction"
const router =express.Router();
const testMiddleware=(req,res,next)=>{
    console.log("calling a middleware");
    if(true){
        res.send('reject middleware')
    }
    next()
}

// express app
const initApiRoutes =(app)=>{
    router.all('*',checkUserJwt,checkUserPermission)
    router.get("/test-api", apiController.testApi)
    router.post("/register",apiController.handleRegister)
    router.post("/login",apiController.handleLogin)
    router.post("/logout",apiController.handleLogOut)
    router.get ("/account",userController.getUserAccount)
    //user Route
    router.get('/user/read', userController.readFunc)
    router.post('/user/create', userController.createFunc)
    router.put('/user/update', userController.updateFunc)
    router.delete('/user/delete', userController.deleteFunc)
   
    //role route
    router.get('/role/read',roleController.readFunc)
    router.post('/role/create', roleController.createFunc)
    // router.put('/role/update', roleController.updateFunc)
    router.delete('/role/delete', roleController.deleteFunc)
    router.get('/role/bygroup/:groupId',roleController.getRoleByGroup)
    router.post('/role/assign-to-group',roleController.assignToGroup)
    

    //Group Route
    router.get('/group/read', groupController.readFunc)

    //pagination

    return app.use("/api/v1/", router)
    //rest api
    //GET-R POST-C PUT-U DEl-D

}

export default initApiRoutes ;