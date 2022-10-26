import "./login.scss"
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../service/userService";
import { UserContext } from "../../context/UserContext";
const Login =(props)=>{
    const  {loginContext}  = useContext(UserContext);
    // console.log(9,loginContext);
    let history=useHistory()
    const handleCreateNewAccount=()=>{
        history.push("/register");
    }
    const [valueLogin,setValueLogin]=useState("")
    const [password,setPassword]=useState("")
    const defaultObjValidInput={
        isValidLogin:true,isValidPassword:true
    }
    
    const  [objValidInput, setObjValidInput]=useState(defaultObjValidInput)

    const handleLogin=async()=>{
        if(!valueLogin){
            toast.error("Please enter your email address or phone number")
            setObjValidInput({...objValidInput,isValidLogin:false})
        }
        if(!password){
            toast.error("Please enter your password")
            setObjValidInput({...objValidInput,isValidPassword:false})
        }
        let response=await loginUser(valueLogin,password)
        // console.log("response login",response);
        if(response&& response.data &&response.data.errorcode==0){
            console.log("response login",response)
            let groupWithRole= response.data.data.groupWithRole
            let email=response.data.data.email
            let username=response.data.data.username
            let token=response.data.data.access_token

            let data={
                
                isAuthenticate: true,
                 token: token,
                  account: {groupWithRole,email,username}
            }
            console.log(42,data);
            localStorage.setItem("jwt",JSON.stringify(token))
            loginContext(data)
            history.push('/user')
            // window.location.reload()

        }
        if(response&& response.data &&response.data.errorcode!=0){
            toast.error(response.data.message)
        }
    }
    const handlePressEnter =(event)=>{
            console.log("check event ", event); 
            if(event.charCode===13 && event.code==="Enter"){
                handleLogin()
            }
    }
    // useEffect(()=>{
    //     let session=sessionStorage.getItem('account')
    //     if(session){
    //       history.push("/")
    //     //   window.location.reload()
    //     }
    // },[])
    return(
        <div className="login-container">
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
                        <input type="text" className={objValidInput.isValidLogin ? 'form-control' : 'form-control is-invalid'} placeholder="Email or Phone number" 
                        value={valueLogin}
                        onChange={(event)=>{setValueLogin(event.target.value)}}
                        />
                        <input type="password" className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder="Password"
                        value={password} onChange={(event)=>{setPassword(event.target.value)}}
                        onKeyPress={(event)=>{handlePressEnter(event)}}
                        />
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                        <span className="text-center"><a href="#" className="fogort-password">Forgot your password</a></span>
                        <hr></hr>
                        <button  className="btn btn-success" onClick={()=>handleCreateNewAccount()}>Create new account</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default Login