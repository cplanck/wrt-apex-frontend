import './css/ApexApp.css';
import {Ion} from "cesium";
import React, { useState } from 'react';
import GPStrack from './components/GPStrack'
import SideNav from './components/SideNav'
import ApexDeployments from './components/ApexDeployments'
import Users from './components/Users'
import Settings from './components/Settings'
import {Route, Routes} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import TopNav from './components/TopNav';
import LoginPage from './components/LoginPage';



// const imageryProvider = new IonImageryProvider({ assetId: 3954 }) // use Sentinel-2 imagery
Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOWMyNGYwNS1iYzY2LTRkMDItYWYwYi00NDZiOTFlZTQzYWUiLCJpZCI6MTE4OTA2LCJpYXQiOjE2NzE1NzcyMjh9.-S71chghA9n7JxDeaZKDpAJi_463RAgGLwz5X7mHQ4Q";

function ApexApp() {

  const [activePage, setActivePage] = useState('/deployment');
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  if(!userLoggedIn){
    getUserCredentials(setUserLoggedIn)
  }

  if(!userLoggedIn){
    return (
      <LoginPage setUserLoggedIn={setUserLoggedIn} userLoggedIn={userLoggedIn}/>
      )
  }
  else{
    return (
      <BrowserRouter>
        <div className='ApexApp'>
          <SideNav activePage={activePage} setActivePage={setActivePage} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
          <div className={menuOpen ? 'DashboardActive' : 'Dashboard'}>
            <TopNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} setUserLoggedIn={setUserLoggedIn}/>
            <div className='MainPanel'>
            <Routes>
                <Route path='/deployments' element={<ApexDeployments />}/>
                <Route path='/users' element={<Users />}/>
                <Route path='/settings' element={<Settings />}/>
            </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  
}

function getUserCredentials(setUserLoggedIn){
  let token = window.localStorage.getItem('user', 'token')
  if(token){
    setUserLoggedIn(true)
  }
}

export default ApexApp;