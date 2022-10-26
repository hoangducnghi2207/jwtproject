import db from "../models/models"
const createNewRole = async (role) => {
    try {
        const testArr = [
            { url: "test1", description: 'abc' },
            { url: "/user/update", description: 'abcd' },

        ]
        let currentRole = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const results = role.filter(({ url: url1 }) => !currentRole.some(({ url: url2 }) => url1 === url2));
        if (results.length == 0) {
            return ({
                message: 'nothing to create',
                errorcode: 0,
                data: ''
            })
        }
        console.log(14, results);
        console.log(8, currentRole);
        await db.Role.bulkCreate(results)
        return {
            message: `Create role success, ${results.length} role `
        }
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

const getAllRole = async () => {
    try {
        let data = await db.Role.findAll()
        return {
            message: `get all role success`,
            errorcode: 0,
            data: data
        }
    }
    catch (e) {
        console.log(48, e)
        return ({
            message: 'service error',
            errorcode: 1,
            data: ''
        })
    }

}

const deleteRole = async (id) => {
    try {
        let data = await db.Role.findOne({
            where: { id: id }
        })
        if (data) {
            await data.destroy()

        }
        return {
            message: `delete role success`,
            errorcode: 0,
            data: data
        }
    }
    catch (e) {
        console.log(48, e)
        return ({
            message: 'service error',
            errorcode: 1,
            data: ''
        })
    }

}
const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                message: `not found role`,
                errorcode: 1,
                data: []
            }
        }
        let role = await db.Group.findOne({
            where: { id: id },
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            }
        })
        console.log(100, role);
        return {
            message: `get role by group role success`,
            errorcode: 0,
            data: role
        }
    }
    catch (e) {
        console.log(48, e)
        return ({
            message: 'service error',
            errorcode: 1,
            data: ''
        })
    }
}
const assignToGroup = async(data) => {
    console.log(117,data);
    try {
        await GroupRole.destroy({
            where:{groupID: +data.groupId}
        })
        await db.GroupRole.bulkCreate(data.groupRole)
        rerturn({
            message: `access role success`,
            errorcode: 0,
            data: []
        })
    }
    catch (e) {
        console.log(48, e)
        return ({
            message: 'service error',
            errorcode: 1,
            data: ''
        })
    }
}
module.exports = { createNewRole, getAllRole, deleteRole, getRoleByGroup, assignToGroup }