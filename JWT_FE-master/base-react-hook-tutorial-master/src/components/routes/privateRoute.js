import { useContext, useEffect } from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
} from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const PrivateRoute = (props) => {
    let history= useHistory();
    const { user } = useContext(UserContext);
        // console.log(14,user);
    // useEffect(() => {
    //     console.log("check context user", user);
    //     let session=sessionStorage.getItem('account')
    //     if(!session){
    //       history.push("/login")
    //       window.location.reload()
    //     }
    // }, [])
    // console.log(23,user.isAuthenticate);
    if(user && user.isAuthenticate==true){
    return (
        <>      
            <Router>
                <Route path={props.path} component={props.component} />
            </Router>,
        </>
    )
    }
    else{
       return <Redirect to="/login"></Redirect>
    }
}
export default  PrivateRoute 