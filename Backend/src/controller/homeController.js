import mysql from 'mysql2'
import bcrypt from 'bcryptjs'
import userService from '../service/userService'
const salt = bcrypt.genSaltSync(10);

const handleHelloWorld = (req, res) => {
    const name = "nghi"
    return res.render("home.ejs", { name })
}
const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList()
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
    return res.render("user.ejs", { userList })
}
const handleCreateNewUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username
    userService.createNewUser(email, password, username)
    return res.redirect("/user")
}
const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return (res.redirect("/user"))
}
const getUpdateUser = async (req, res) => {
    let id = req.params.id
    let user = await userService.getUserById(id)
    let userData = user
    // if (user && user.length>0) {
    //     userData=user[0]
    // }
    // console.log("Check User",user);
    return (res.render("user-update.ejs", { userData }))
}
const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id
    // console.log("check body", req.body);
    await userService.updateUserInfo(email, username, id)
    return (res.redirect("/user"))
}
module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser, getUpdateUser, handleUpdateUser
}