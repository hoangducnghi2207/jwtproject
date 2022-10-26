import { useEffect, useState,forwardRef,useImperativeHandle } from "react"
import { toast } from "react-toastify"
import { fetchAllRole,deleteRole } from "../service/roleService"
const TableRole =forwardRef ((props,ref) => {
    const [listRole,setListRole]=useState()
   
    useEffect(()=>{
        getAllRole()
    },[])

    useImperativeHandle(ref,()=>({
        fetchListRoleAgain()
        {
             getAllRole()
        }
    }))
    const getAllRole =async()=>{
        let data=await fetchAllRole()
        console.log(13,data);
        if(data && data.data && data.data.errorcode==0)
        {
            setListRole(data.data.data)
        }
    }
    const handleDeleteRole=async (role)=>{
        let data =await deleteRole(role)
        console.log(20,data);
       
            toast.success("delete succes")
            await getAllRole()
        
    }
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">URL</th>
                        <th scope="col">Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listRole && listRole.length > 0 ?
                        <>
                            {listRole.map((item, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            
                                            <button className="btn btn-danger"
                                                onClick={() => handleDeleteRole(item)}
                                            ><i className="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                        :
                        <><tr><td colSpan={4}>Not found role</td></tr></>}
                </tbody>
            </table>
        </>
    )
})
export default TableRole