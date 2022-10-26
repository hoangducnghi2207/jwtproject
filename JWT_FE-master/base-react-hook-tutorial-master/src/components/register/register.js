import "./register.scss"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { registerNewUser } from "../service/userService";

const Register = (props) => {
    let history = useHistory()
    const handleLogin = () => {
        history.push("/login");
    }
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput={
        isValidEmail:true,
        isValidPhone:true,
        isValidPassword:true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput]=useState(defaultValidInput)
    useEffect(() => {
        // axios.get("http://localhost:8000/api/v1/test-api").then(
        //     data => {
        //         console.log("check data axios", data);
        //     }
        // )
        axios.post("http://localhost:8000/api/v1/register",{
                email,phone,username,password
            })
    
        }, [])
    const isValidateInput = () => {
            setObjCheckInput(defaultValidInput);

            if(!email){
                toast.error("Email is required!");
                //Object destructuring
                setObjCheckInput({...defaultValidInput,isValidEmail:false})
                return false
            }
            let re = /\S+@\S+\.\S+/;
                if(!re.test(email)){
                    setObjCheckInput({...defaultValidInput,isValidEmail:false})
                    toast.error("invalid emai address")
                }
            if(!phone){
                setObjCheckInput({...defaultValidInput,isValidPhone:false})
                toast.error("Phone is required!");
                return false
            }
            if(!password){
                setObjCheckInput({...defaultValidInput,isValidPassword:false})
                toast.error("Password is required!");
                return false
            }
            if(password!=confirmPassword){
                setObjCheckInput({...defaultValidInput,isValidConfirmPassword:false})
                toast.error("Your password is not the same")
                return false
            }
            
                
              
            return true
    }
    const handleRegister =async () => {
        let check=isValidateInput();
        if(check==true){
           let response=await registerNewUser( email,phone,username,password)
           let serverData=response.data
           if(+serverData.errorcode==0){
            toast.success(serverData.message)
            history.push("/login")
           }
           else{
            toast.error(serverData.message)
           }
           console.log(response);
        }

    }
    return (
        <div className="register-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="brand">
                            Duc Nghi
                        </div>
                        <div className="detail">
                            Learning everything
                        </div>
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3 ">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder="Email"
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder="Phone Number"
                                value={phone} onChange={(event) => setPhone(event.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Username"
                                value={username} onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder="Password"
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder="Confirm Password"
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" type="submit" onClick={() => handleRegister()}>Register</button>

                        <hr></hr>
                        <button className="btn btn-success" onClick={() => handleLogin()}>Already have account. Login</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Register