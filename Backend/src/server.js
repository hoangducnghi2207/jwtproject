require("dotenv").config()
import express  from "express";
import configeViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectDB from "./config/configDB";
import initApiRoutes from "./routes/api";
import {createJwt,verifyToken} from "./middleware/jwtAction"
import cookieParser from "cookie-parser";
const app =express();
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    if(req.method==='OPTIONS'){
        return res.sendStatus(200)
    }
    // Pass to next layer of middleware
    next();
});
//config view engine
configeViewEngine(app);
//config body-parser    
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//config cookie-parser
app.use(cookieParser())
//test connectDB
connectDB();


//initWebRoutes(app);
initWebRoutes(app);
initApiRoutes(app)
const PORT=8000
// Add headers before the routes are defined

app.listen(PORT,()=>{
    console.log("JWT BACKEND RUNNING from port" +PORT);
})