require("dotenv").config()
import jwt from "jsonwebtoken"
import db from "../models/models"
const nonSecurePaths = ['/logout', '/login', '/register'];
const createJwt = (payload) => {
    let token = null
    try {
        token = jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN })
        return token
    }
    catch (e) {
        console.log(e);
    }

}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let data = null
    try {
        let decoded = jwt.verify(token, key)
        data = decoded
    }
    catch (e) {
        console.log(23, e);
    }
    return data

}

const extractToken = (req) => {

    if (req.headers.authorization && req.headers.authorization.split('')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } 
    return null;

}
const checkUserJwt = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies
    let tokenFromHeader =extractToken(req)
    console.log(33, cookies);
    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt :tokenFromHeader
        let decoded = verifyToken(token)
        console.log("decoded", decoded);
        if (decoded) {
            req.user = decoded
            req.token = token
            console.log(42, req.user);
            console.log(43, req.token);
            next()
        }
        else {
            return res.status(401).json({
                message: 'not authenticated user',
                errorcode: 1,
                data: ''
            })
        }
    }
    else {
        return res.status(401).json({
            message: 'not authenticated user',
            errorcode: 1,
            data: ''
        })
    }
}
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
    console.log(73,req.path);
    if (req.user) {
        let role = req.user.role.Roles
        let email = req.user.email
        let currentUrl = req.path
        let canAccess = role.some(item => item.url === currentUrl || currentUrl.includes(item.url))
        // console.log(63, canAccess);
        if (!role || role.length == 0) {
            return res.status(401).json({
                message: 'You do not have permission to access this resource',
                errorcode: 1,
                data: ''
            })
        }
        if (canAccess === true) {
            next()
        }
        else {
            return res.status(401).json({
                message: 'You do not have permission to access this resource',
                errorcode: 1,
                data: ''
            })
        }
    }
    else {
        return res.status(401).json({
            message: 'not authenticated user',
            errorcode: 1,
            data: ''
        })
    }
}

module.exports = { createJwt, verifyToken, checkUserJwt, checkUserPermission }