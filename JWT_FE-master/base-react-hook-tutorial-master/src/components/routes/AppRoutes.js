import Login from "../login/login";
import Register from "../register/register"
import User from "../user/user"
import PrivateRoute from "./privateRoute";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Role from "../Role/Role";
import GroupRole from "../groupRole/GroupRole";
import Home from "../home/home";
const AppRoutes = (props) => {
    const Project = () => {
        return (
            <div>project</div>
        )


    }
    return (
        <>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                {/* <Route path="/user">
                    <User />
                </Route> */}
                <PrivateRoute path="/user" component={User} />
                <PrivateRoute path="/project" component={Project} />
                <PrivateRoute path="/role" component={Role} />
                <PrivateRoute path="/group-role" component={GroupRole} />
                <Route path="/" component={Home}/>

               
                <Route path="*">
                    404 Not Found
                </Route>
            </Switch>
        </>
    )
}
export default AppRoutes