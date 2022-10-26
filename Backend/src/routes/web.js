import  express from "express";
import homeController from "../controller/homeController"
import apiController from "../controller/apiController"
const router =express.Router();
// express app
const initWebRoutes =(app)=>{
    router.get("/",homeController.handleHelloWorld)
    router.get("/user",homeController.handleUserPage)
    router.post("/users/create-user",homeController.handleCreateNewUser)
    router.post("/delete-user/:id", homeController.handleDeleteUser)
    router.get("/update-user/:id",homeController.getUpdateUser)
    router.post("/users/update-user",homeController.handleUpdateUser)
    router.get("/api/test-api", apiController.testApi)
    return app.use("/", router)
    //rest api
    //GET-R POST-C PUT-U DEl-D

}

export default initWebRoutes ;