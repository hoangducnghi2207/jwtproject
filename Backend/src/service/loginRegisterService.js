import { raw } from "body-parser";
import db from "../models/models"
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize';
import {getGroupWithRole} from '../middleware/jwtService'
import {createJwt} from '../middleware/jwtAction'
require("dotenv").config()
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    else return false;
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    else return false;
}
const checkPassword=(inputPassword, hashPassword)=>{
    return bcrypt.compareSync(inputPassword, hashPassword) //true or false
}
const registerNewUser = async (rawUserdata) => {
    //check email/phonenumber are exist
    try {
        let isEmailExist = await checkEmailExist(rawUserdata.email);
        if (isEmailExist == true) {
            return {
                message: "Email already exist",
                errorcode: '1',

            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserdata.phone)

        if (isPhoneExist == true) {
            return {
                message: "Phone number already exist",
                errorcode: '1',

            }
        }
        //hash password
        let hashPassword = hashUserPassword(rawUserdata.password)
        //create new user
        await db.User.create({
            email: rawUserdata.email,
            username: rawUserdata.username,
            password: hashPassword,
            phone:rawUserdata.phone,
            groupID:4
        })
        return{
            message:'create succesfully',
            errorcode:'0'
        }
    } catch (e) {
        console.log(e);
        return{
            message:'something wrong',
            errorcode:'1'
        }
    }
   
}
const handleUserLogin=async(rawdata)=>{
    try{
        console.log("rawdata",rawdata);
        // let isEmailExist = checkEmailExist(rawdata.valueLogin);
        // let isPhoneExist = checkPhoneExist(rawdata.valueLogin)
        let user=await db.User.findOne({
            where:{
                [Op.or]: [
                    { email: rawdata.valueLogin },
                    { phone: rawdata.valueLogin}
                ]
            }
        })
        // console.log("Check user", user);
        if(user){
            let isCorrectPassword= checkPassword(rawdata.password,user.password)
            // if (isEmailExist == true) {
            //     return {
            //         message: "Email correct",
            //         errorcode: '1',
            //         data:''
            //     }
            // }
            // if (isPhoneExist == true) {
            //     return {
            //         message: "Phone correct",
            //         errorcode: '1',
            //         data:''
            //     }
            // }
            if(isCorrectPassword==true){
                // let token=
                //test role
                let groupWithRole=await getGroupWithRole(user)
                // console.log(110,groupWithRole);
                let payload={
                    email:user.email,
                    role:groupWithRole,
                    username:user.username,
                }
                // console.log(117,payload);
                let token= createJwt(payload)
                return {
                    message: "OK",
                    errorcode: "0",
                    data:{
                        access_token:token,
                        groupWithRole,
                        email:user.email,
                        username:user.username
                    }
                }
            }
            else{
                return {
                    message: "Wrong password",
                    errorcode: '1',
                    data:''
                }
            }
        }
        
        else{
            return {
                message: "Wrong Email/Phonenumber",
                errorcode: '1',
                data:''
            }
        }
      
    }catch(e){
        console.log(e);
        return{
            message:'something wrong',
            errorcode:'-1'
        }
    }
}

module.exports = { registerNewUser,handleUserLogin  }