import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./user.scss"
import { fetchAllUser, deleteUser } from "../service/userService"
import { set } from "lodash"
import ReactPaginate from "react-paginate"
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete"
import ModalUser from "./ModalUser"
import { UserContext } from "../../context/UserContext"
const User = (props) => {
    const [listUser, setListUser] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(4)
    const [totalPage, setTotalPage] = useState(0)
    //Delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModel, setDataModel] = useState({})
    //udate-create
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState("")
    const [dataModelUser, setDataModelUser] = useState({})
    useEffect(() => {
        fetchUsers()

    }, [currentPage])
    // const { user } = UserContext(UserContext);
    // console.log(28,user);
    const fetchUsers = async (page) => {

        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && response.data && response.data.errorcode == 0) {
            // setListUser(response.data.data)
            console.log(response.data.data);
            setTotalPage(response.data.data.totalPage)
            setListUser(response.data.data.user)
        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
        await fetchUsers(event.selected + 1)
    };
    const handleDeleteUser = async (user) => {
        setDataModel(user)
        setIsShowModalDelete(true)
        // let respond=await deleteUser(user)
        // console.log('check delete respond',respond);
        // if(respond && respond.data.errorcode==0){
        //     toast.success(respond.data.message)
        //     await fetchUsers()
        // }
        // else{
        //     toast.error(respond.data.message)
        // }
    }
    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModel({})
    }
    const confirmDeleteUser = async () => {
        let respond = await deleteUser(dataModel)
        console.log('check delete respond', respond);
        if (respond && respond.data.errorcode == 0) {
            toast.success(respond.data.message)
            await fetchUsers()
        }
        else {
            toast.error(respond.data.message)
        }
    }
    const OnHideModelUser = async () => {
        setIsShowModalUser(false)
        setDataModelUser({})
        await fetchUsers()
    }

    const handleEditUser = (user) => {
        setActionModalUser("UPDATE")
        setDataModelUser(user)
        setIsShowModalUser(true)

    }
    return (
        <>
            <div className="container">
                <div className="manage-user-container">
                    <div className="user-header">
                        <div>
                            <h3>Table User</h3>
                        </div>
                        <div className="action">
                            <button className="btn btn-success">Refresh</button>
                            <button className="btn btn-primary" onClick={() => {
                                setIsShowModalUser(true);
                                setActionModalUser("CREATE")
                            }}>Add new user</button>
                        </div>

                    </div>
                    <div className="user-body">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser && listUser.length > 0 ?
                                    <>
                                        {listUser.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className="btn btn-warning mx-3"
                                                            onClick={() => handleEditUser(item)}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </button>
                                                        <button className="btn btn-danger"
                                                            onClick={() => handleDeleteUser(item)}
                                                        ><i className="fa fa-trash" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <><tr><td>Not found user</td></tr></>}
                            </tbody>
                        </table>
                    </div>
                    {totalPage > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModel={dataModel}
            />
            <ModalUser

                onHide={OnHideModelUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModelUser={dataModelUser}
            />
        </>
    )
}
export default User