import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import Bluebird from 'bluebird';
import db from '../models/models';
import { raw } from 'body-parser';
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    let hashpass = hashUserPassword(password)
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: Bluebird
    // })
    // connection.query(
    //     'INSERT INTO users (email, password, username) VALUES(?,?,?)', [email, hashpass, username],
    //     function (err, results, fields) {
    //         console.log(results); // results contains rows returned by server
    //         console.log(fields); // fields contains extra meta data about results, if available
    //         if (err) {
    //             console.log(26, err);
    //         }
    //     }
    // );
    try {
        await db.User.create(
            {
                username: username,
                email: email,
                password: hashpass
            }
        )
    } catch (error) {
        console.log("check error", error);
    }


}

const getUserList = async () => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: Bluebird
    // })
    
    //test relationships
    let role=await db.Role.findAll({
        include:{model:db.Group, where:{id:1}}, 
        raw:true,
        nest:true
    })
    // console.log("check new user",role);
    let users = []
    users = await db.User.findAll()
    return users

}
const deleteUser = async (userID) => {
    // DELETE FROM users WHERE id='Alfreds Futterkiste';
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: Bluebird
    // })
    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
    //     return rows
    // } catch (error) {
    //     console.log("check error", error);
    // }
    await db.User.destroy({
        where: { id: userID }

    })


}
const getUserById = async (id) => {
    let user={};
    user=await db.User.findOne({
        where:{id:id}
    })
    return user.get({plain:true})
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: Bluebird
    // })
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
    //     return rows
    // } catch (error) {
    //     console.log("check error", error);
    // }

}
const updateUserInfo = async (email, username, id) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: Bluebird
    // })
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE users SET email= ?, username= ?  WHERE id= ?', [email, username, id]);
    //     return rows
    // } catch (error) {
    //     console.log("check error", error);
    // }
    await db.User.update(
        {email:email,username:username}, {where:{id:id}}
    )

}
module.exports = { createNewUser, getUserList, deleteUser, getUserById, updateUserInfo }