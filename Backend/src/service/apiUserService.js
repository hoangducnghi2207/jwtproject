import db from "../models/models";
import bcrypt from 'bcryptjs'

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
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword) //true or false
}
const getAllUser = async () => {
    try {
        let user = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ['name', 'description'] }
        })
        if (user) {
            console.log("all data", user);
            return ({
                message: "get success",
                errorcode: 0,
                data: user
            })
        }
        else {
            return ({
                message: "user not found",
                errorcode: 1,
                data: []
            })
        }
    }
    catch (e) {
        console.log((26, e));
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset, limit: limit,
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: { model: db.Group, attributes: ['name', 'description', "id"] }
        })
        let totalPage = Math.ceil(count / limit)
        let data = {
            totalRows: count, totalPage: totalPage, user: rows
        }
        console.log(40, "check data", data);
        return ({
            message: "paging success",
            errorcode: 0,
            data: data
        })
    }
    catch (e) {
        console.log(37, e);
        return ({
            message: "serivce error",
            errorcode: 1,
            data: []
        })
    }
}
const createUser = async (data) => {
    try {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist == true) {
            return {
                message: "Email already exist",
                errorcode: '1',
                data: []
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone)

        if (isPhoneExist == true) {
            return {
                message: "Phone number already exist",
                errorcode: '1',
                data: []
            }
        }
        //hash password
        let hashPassword = hashUserPassword(data.password)
        console.log(106, data)
        await db.User.create({
            email: data.email,
            username: data.username,
            password: hashPassword,
            phone: data.phone,
            sex: data.sex,
            groupID: data.group,
            address: data.address
        })
        return ({
            message: "create success",
            errorcode: 0,
            data: []
        })
    }
    catch (e) {
        console.log(34, e)
        return ({
            message: 'service error',
            errorcode: 1,
            data: ''
        })
    }
}
const updateUser = async (data) => {
    try {
        if (!data.groupID) {
            return ({
                message: "not found GroupID",
                errorcode: 1,
                data: 'group'
            })
        }

        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            //update 
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupID: data.groupID
            })
            return ({
                message: 'user update success',
                errorcode: 0,
                data: ''
            })
        }
        else {
            //not found
            return ({
                message: 'user not found',
                errorcode: 1,
                data: ''
            })
        }
    }
    catch (e) {
        console.log(162, e);
        return ({
            message: 'service error',
            errorcode: 1,
            data: ''
        })
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy()
            return ({
                message: "fetch ok",
                errorcode: 0,
                data: ''
            })
        }
        else {
            return ({
                message: "user not found",
                errorcode: 1,
                data: ''
            })
        }
    }
    catch (e) {
        console.log(49, e);
    }
    return ({
        message: "service error",
        errorcode: 1,
        data: ''
    })
}
module.exports = { getAllUser, updateUser, createUser, deleteUser, getUserWithPagination }