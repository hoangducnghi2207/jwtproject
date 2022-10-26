import { useState, useEffect } from "react";
import React from "react";
import { getUserAccount } from "../components/service/userService";
import { useLocation } from "react-router-dom";

const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const userDefault = {
    isLoading: true,
    isAuthenticate: false,
    token: "",
    account: {}
  }
  const [user, setUser] = useState(userDefault);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: '',
      auth: false,
    }));
  };
  const fetchUser = async () => {
    let response = await getUserAccount()
    if (response && response.data.errorcode == 0) {
      let groupWithRole = response.data.data.groupWithRole
      let email = response.data.data.email
      let username = response.data.data.username
      let token = response.data.data.access_token

      let data = {
        isLoading: false,
        isAuthenticate: true,
        token: token,
        account: { groupWithRole, email, username },

      }
      setUser(data)
    }
    else{
      setUser({...userDefault,isLoading:false})
    }

  }
  useEffect(() => {
    console.log(">>> aaaaa", window.location.pathname, window.location)

   
      fetchUser()
    
  }, [])
  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider }