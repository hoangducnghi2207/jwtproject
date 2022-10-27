import React, { useEffect, useState } from 'react';
import {
  Link,
  BrowserRouter as Router,
  NavLink,
  Switch,
  useLocation,
  useHistory
} from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import './Nav.scss'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import logo from '../logo/react-1.svg'
import { logoutUser } from '../service/userService';
import { toast } from 'react-toastify';
const NavHeader = (props) => {
  let location = useLocation();
  const { user, logoutContext } = useContext(UserContext)
  const [isShow, setIsShow] = useState(true)

  const history = useHistory()
  const handleLogout = async () => {
    let data = await logoutUser()
    localStorage.removeItem('jwt')
    console.log(27, data)
    logoutContext()
    if (data && data.data && data.data.errorcode == 0) {
      toast.success('Log out success')
      history.push('/login')
    }
    else {
      toast.error(data.data.message)
    }
  }
  // useEffect(() => {
  //   let session = sessionStorage.getItem('account')
  //   if (location.pathname=="/login") {
  //     setIsShow(false)
  //   }

  //   // if (session) {
  //   //   //checkrole
  //   //   setIsShow(true)
  //   // }
  // }, [])
  if (user && user.isAuthenticate == true || (location.pathname == '/')) {
    return (
      <>

        {/* <div className="topnav">
            <a class="active" href="/">Home</a>
            <a href="/user">Users</a>
            <a href="/project">Project</a>
            <a href="/about">About</a>
          </div> */}
        <div className='nav-header'>
          <Navbar bg="header" expand="lg">
            <Container>
              <Navbar.Brand href="/"><img src={logo} width="30" height="30" className='d-inline-block-align-top' color='red' />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className="nav-link">Home</NavLink>
                  <NavLink to="/user" exact className="nav-link">User</NavLink>
                  <NavLink to="/project" exact className="nav-link">Project</NavLink>
                  <NavLink to="/role" exact className="nav-link">Role</NavLink>
                  <NavLink to="/group-role" exact className="nav-link">Group Role</NavLink>
                  {/* <NavLink to="/about" exact className="nav-link">About</NavLink> */}

                  {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                <Nav>
                  {user && user.isAuthenticate === true
                    ?
                    <>
                      <Nav.Item href="#deets" className='nav-link'>Welcome {user.account.username}</Nav.Item>

                      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item >Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item  ><span onClick={() => handleLogout()}>Log out</span></NavDropdown.Item>
                      </NavDropdown>
                    </>
                    :
                    <Link className='nav=link' to='/login'>
                      Login
                    </Link>

                  }

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  }
  else {
    return <></>
  }

}

export default NavHeader;