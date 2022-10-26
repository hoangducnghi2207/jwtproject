import axios from "../setup/axios"
const createRole = (role) => {
    return axios.post("/api/v1/role/create", [...role])
}
const fetchAllRole = () => {
    return axios.get(`/api/v1/role/read`)
}
const deleteRole = (role) => {
    return axios.delete("/api/v1/role/delete", {
        data: { id: role.id }
    })
}
const fetchRoleByGroup = (groupId) => {
    return axios.get(`/api/v1/role/bygroup/${groupId}`)
}
const assginToGroup=()=>{
    return axios.post(`/api/v1//role/assign-to-group`)

}
export { createRole, fetchAllRole, deleteRole,fetchRoleByGroup,assginToGroup }