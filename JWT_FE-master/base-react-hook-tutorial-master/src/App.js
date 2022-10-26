// import logo from './logo.svg';
import './App.scss';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/register/register';
import User from './components/user/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import AppRoutes from './components/routes/AppRoutes';
import { Audio } from 'react-loader-spinner'
import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import NavHeader from './components/navigation/Nav';
function App() {
  const { user } = useContext(UserContext);
  console.log(24, user);
  return (
    <>
      <Router>
        {user && user.isLoading == true ? <Audio
          heigth="100"
          width="100"
          color='grey'
          ariaLabel='loading'
        /> : 
        <>
          <div className='appHeader'>
            <NavHeader />
          </div>
          <div className='app-container'>
            <AppRoutes />
          </div></>}

      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
    </>
  );
}

export default App;
