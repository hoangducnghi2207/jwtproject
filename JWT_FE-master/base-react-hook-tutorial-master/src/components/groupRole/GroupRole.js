import { useState, useEffect } from 'react'
import { fetchGroup } from "../service/userService"
import { toast } from "react-toastify";
import { fetchAllRole, fetchRoleByGroup,assginToGroup } from "../service/roleService"
import './groupRole.scss'
import _ from 'lodash';

const GroupRole = () => {
    const [userGroup, setUserGroup] = useState([])
    const [selectGroup, setSelectGroup] = useState("")
    const [listRole, setListRole] = useState()
    const [assignRoleByGroup, setAssignRoleByGroup] = useState([])
    useEffect(() => {
        getGroup();
        getAllRole();
        // getRoleByGroup()

    }, [])

    const getGroup = async () => {
        let res = await fetchGroup();
        if (res && res.data && res.data.errorcode == 0) {
            setUserGroup(res.data.data)
        }
        else {
            toast.error(res.data.message)
        }
    }
    const getAllRole = async () => {
        let data = await fetchAllRole()
        console.log(13, data);
        if (data && data.data && data.data.errorcode == 0) {
            setListRole(data.data.data)
        }
    }

    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value)
        console.log(38, value);
        if (value) {
            let data = await fetchRoleByGroup(value)
            console.log(46, data);
            if (data && data.data && data.data.errorcode == 0) {
                let result=BuildDataRoleByGroup(data.data.data.Roles,listRole)
                console.log(46,result);
                setAssignRoleByGroup(result)
            }
        }
    }
    const BuildDataRoleByGroup=(groupRole,allRole)=>{
            let result=[]
            if(allRole&&allRole.length>0){
                allRole.map(role=>{
                    let object={}
                    object.url=role.url
                    object.id=role.id
                    object.description=role.description
                    object.isAssign=false
                    // console.log(59,groupRole);
                    if(groupRole && groupRole.length>0){
                        object.isAssign=groupRole.some(item=> item.url===object.url)
                    }
                    result.push(object)
                })
                console.log(result);
            }
            return result
    }
    const handleSelectRole=(value)=>{
        const _assignRoleByGroup=_.cloneDeep(assignRoleByGroup)
        let foundIndex=_assignRoleByGroup.findIndex(item=>+item.id===+value)
        console.log(72,foundIndex);
        if(foundIndex>-1){
            _assignRoleByGroup[foundIndex].isAssign=!_assignRoleByGroup[foundIndex].isAssign
        }
        setAssignRoleByGroup(_assignRoleByGroup     )
        
    }
    const buildDataToSave=()=>{
        //data: groupID:4,groupRole[{},{}]
        let result={}
        const _assignRoleByGroup=_.cloneDeep(assignRoleByGroup)
        result.groupId=selectGroup
        let groupRoleFilter=_assignRoleByGroup.filter(item=>item.isAssign===true)
        let finalGroupRole=groupRoleFilter.map((item)=>{
            let data={groupId:+selectGroup, roleId:+item.id}
            return data
        })
        result.groupRole=finalGroupRole
        return result
    }
    const handleSave=async()=>{
        let data=buildDataToSave()
        console.log(94,data);
        let res= await assginToGroup(data)
        console.log(96,res);
    }
    return (
        <div className='group-role container'>
            <div className='container'>
                <h4> Group Role</h4>
                <div className='asign-group-role'></div>
                <div>
                    Select Group:
                    <div className="col-12 col-sm-6 form-group">
                        <label>Group </label>
                        <select className="form-select"
                            onChange={(event) => handleOnchangeGroup(event.target.value)}>
                            <option value="">Please Select Your Group</option>
                            {userGroup.length > 0 &&
                                userGroup.map((item, index) => {
                                    return (
                                        <option key={`group=${index}`} value={item.id}>{item.name}</option>)
                                })
                            }
                        </select>
                    </div>
                    <hr />
                    {selectGroup &&
                        <div className='roles'>
                            <h5>Assign Roles</h5>
                            {
                                assignRoleByGroup && assignRoleByGroup.length > 0 &&
                                assignRoleByGroup.map((item, index) => {
                                    return (
                                        <div class="form-check" key={`list-role-${index}`}>
                                            <input class="form-check-input" 
                                            type="checkbox" value={item.id}
                                            checked={item.isAssign} 
                                            onChange={(event)=>handleSelectRole(event.target.value)}
                                            id={`list-role-${index}`} />
                                            <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                {item.url}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        <div className='mt-3'>
                            <button className='btn btn-danger ' onClick={()=>handleSave()}> Save</button>
                        </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GroupRole