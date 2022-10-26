import db from "../models/models"
const getGroupWithRole = async (user) => {
    let role = await db.Group.findOne({
        //Sequelize exclude belongs-to-many mapping object 
        include: { model: db.Role },
        where: { id: user.groupID },
        include: [{
            model: db.Role,
            attributes: ["id", "url", "description"],
            through: { attributes: [] }
        }]
        
    })
    return (role ? role : {})


}
module.exports = { getGroupWithRole }