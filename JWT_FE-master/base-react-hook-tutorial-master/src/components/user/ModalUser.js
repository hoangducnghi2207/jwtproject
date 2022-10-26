import { Modal } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { fetchGroup } from "../service/userService"
import { toast } from "react-toastify";
import { createNewUser } from "../service/userService";
import { updateCurrentUser } from "../service/userService";
import _, { create } from "lodash"
import { act } from "react-dom/test-utils";
// Not merge state
const ModalUser = (props) => {
    const [userGroup, setUserGroup] = useState([])
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }
    const [userData, setUserData] = useState(defaultUserData)
    const [validInputs, setValidInputs] = useState(validInputsDefault)
    const { action, dataModelUser } = props
    useEffect(() => {
        getGroup()

    }, [])
    useEffect(() => {
        if (action === 'UPDATE') {
            console.log("check data update ", props.dataModelUser);
            setUserData({ ...dataModelUser, group: dataModelUser.Group ? dataModelUser.Group.id : '' })
        }
    }, [dataModelUser])
    const getGroup = async () => {
        let res = await fetchGroup();
        if (res && res.data && res.data.errorcode == 0) {
            setUserGroup(res.data.data)
            if (res.data.data && res.data.data.length > 0) {
                let group = res.data.data
                setUserData({ ...userData, group: group[0].id })
            }
        }
        else {
            toast.error(res.data.message)
        }
    }
    
    const handleOnChangeInput = (value, name) => {
        let _userdata = _.cloneDeep(userData)
        _userdata[name] = value
        setUserData(_userdata)
        console.log(61, _userdata);
    }
    const checkValidateInput = () => {
        //create user
        if (action === 'UPDATE') return true
        setValidInputs(validInputsDefault)
        let arr = ['email', 'phone', 'password', 'group']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                //Update arr iput   
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false
                setValidInputs(_validInputs)
                toast.error(`Empty input ${arr[i]}`)
                check = false
                break;
            }
            return check

        }
    }
    const handleConfirmUser = async () => {
        //create user   
        let check = checkValidateInput()
        console.log("check", check)
        if (check == true) {
            let res = action === 'CREATE' ?
                await createNewUser({ ...userData, groupID: userData['group'] })
                : await updateCurrentUser({ ...userData, groupID: userData['group'] })

            console.log(75, res);
            if (res.data && res.data.errorcode == 0) {
                props.onHide();
                setUserData({ ...defaultUserData, group: userGroup[0].id })

            }
            else {
                toast.error("error create user")
            }
        }
    }
    return (
        <>
            <Modal size="lg" show={props.show} className="modal-user" onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE' ? 'Create new user' : 'Edit user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email (*)</label>
                            <input disabled={action === 'CREATE' ? false : true}
                                className={validInputs.email ? "form-control" : "form-control is-invalid"} type="email" value={userData.email}
                                onChange={(event) => { handleOnChangeInput(event.target.value, "email") }}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone Number (*)</label>
                            <input disabled={action === 'CREATE' ? false : true}
                                className={validInputs.phone ? "form-control" : "form-control is-invalid"} type="text" value={userData.phone}
                                onChange={(event) => { handleOnChangeInput(event.target.value, "phone") }} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Username </label>
                            <input className={validInputs.username ? "form-control" : "form-control is-invalid"} type="text" value={userData.username}
                                onChange={(event) => { handleOnChangeInput(event.target.value, "username") }} />
                        </div>
                        {action === 'CREATE' &&
                            <div className="col-12 col-sm-6 form-group">
                                <label>Password </label>
                                <input className={validInputs.password ? "form-control" : "form-control is-invalid"} type="password" value={userData.password}
                                    onChange={(event) => { handleOnChangeInput(event.target.value, "password") }} />
                            </div>
                        }
                        <div className="col-12 col-sm-12 form-group">
                            <label>Address </label>
                            <input className={validInputs.address ? "form-control" : "form-control is-invalid"} type="text" value={userData.address}
                                onChange={(event) => { handleOnChangeInput(event.target.value, "address") }} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender </label>
                            <select className="form-select" value={userData.sex}
                                onChange={(event) => { handleOnChangeInput(event.target.value, "sex") }}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Group </label>
                            <select className="form-select"
                                onChange={(event) => { handleOnChangeInput(event.target.value, "group") }}
                                value={userData.group}
                            >
                                {userGroup.length > 0 &&
                                    userGroup.map((item, index) => {
                                        return (<option key={`group=${index}`} value={item.id}>{item.name}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={() => { handleConfirmUser() }}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default ModalUser