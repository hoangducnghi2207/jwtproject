import './Role.scss'
import { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { createRole} from '../service/roleService'
import TableRole from './TableRole'
const Role = (props) => {
    const dataChildDefault = {
        url: '',
        description: '',
        isValidUrl: true
    }
    const [listChild, setListChild] = useState({
        child1: dataChildDefault,
    })
    const childRef=useRef()
    useEffect(() => {
        Object.entries(listChild).map(([key, value]) => {
            console.log(12, "key", key, "value", value);
        })
    }, [])
    const handleOnChangeInput = (name, value, key) => {
        let _listChild = _.cloneDeep(listChild)
        _listChild[key][name] = value

        if (value && name === 'url') {
            _listChild[key]['isValidUrl'] = true
        }
        setListChild(_listChild)

    }

    const handleAddNewInput = () => {
        let _listChild = _.cloneDeep(listChild)
        _listChild[`child-${uuidv4()}`] = dataChildDefault
        setListChild(_listChild)
    }
    const handleDeleteInput = (key) => {
        let _listChild = _.cloneDeep(listChild)
        console.log(key);
        delete _listChild[key]
        setListChild(_listChild)

    }
    const buildDataToPersit = () => {
        let _listChild = _.cloneDeep(listChild)
        let result = []
        Object.entries(_listChild).map(([key, child], index) => {
            result.push({
                url: child.url, description: child.description
            })
        })
        return result
    }
    const handleSave = async () => {
        console.log(listChild);
        let invalidObj = Object.entries(listChild).find(([key, child], index) => {
            return child && !child.url
        })
        console.log(47, invalidObj);
        if (!invalidObj) {
            //call api
            let data = buildDataToPersit()
            let res = await createRole(data)
            console.log(64, res);

            toast.success("Create Role success")

            console.log(62, data);
        }
        else {
            console.log("ivalid object", invalidObj);
            toast.error("Input must not be empty")
            let _listChild = _.cloneDeep(listChild)
            const key = invalidObj[0]
            console.log(55, invalidObj);
            _listChild[key]['isValidUrl'] = false
            setListChild(_listChild)
        }

    }

    return (
        <div className='role-container'>
            <div className='container'>
                <div className='adding-role mt-3'>
                    <div className='tittle-role'>
                        <h3>Add a new role</h3>
                    </div>
                    <div className='row role-parent'>
                        {
                            Object.entries(listChild).map(([key, child], index) => {
                                return (
                                    <>
                                        <div className='row role-child' key={`child=${key}`}>
                                            <div className={`col-5 form-group ${key}`} >
                                                <label>URL:</label>
                                                <input type="text" className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'}
                                                    value={child.url}
                                                    onChange={(event) => handleOnChangeInput('url', event.target.value, key)}
                                                />
                                            </div>
                                            <div className='col-5 form-group'>
                                                <label>Description:</label>
                                                <input type="text" className='form-control'
                                                    value={child.description}
                                                    onChange={(event) => handleOnChangeInput('description', event.target.value, key)}
                                                />
                                            </div>
                                            <div className='col-2 mt-4 actions'>
                                                <i className="fa fa-plus-circle add" aria-hidden="true"
                                                    onClick={() => handleAddNewInput()}></i>
                                                {index >= 1 &&
                                                    <i className="fa fa-trash delete" aria-hidden="true"
                                                        onClick={() => handleDeleteInput(key)}>
                                                    </i>}
                                            </div>
                                        </div>
                                    </>)
                            })
                        }
                        <div>
                            <button className='btn btn-warning mt-3'
                                onClick={() => (handleSave())}>Save</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className='mt-3'>
                    <h4> List current row</h4>
                    <TableRole ref={childRef}/>

                </div>
       
            </div>
        </div>

    )
}
export default Role