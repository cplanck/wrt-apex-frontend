import './css/ApexApp.css';
import {Ion} from "cesium";
import React, { useState } from 'react';
import GPStrack from './components/GPStrack'
import SideNav from './components/SideNav'
import ApexDeployments from './components/ApexDeployments'
import Settings from './components/Settings'
import {Route, Routes, Navigate} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import TopNav from './components/TopNav';
import LoginPage from './components/LoginPage';
import Users from './components/Users';



// const imageryProvider = new IonImageryProvider({ assetId: 3954 }) // use Sentinel-2 imagery
Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOWMyNGYwNS1iYzY2LTRkMDItYWYwYi00NDZiOTFlZTQzYWUiLCJpZCI6MTE4OTA2LCJpYXQiOjE2NzE1NzcyMjh9.-S71chghA9n7JxDeaZKDpAJi_463RAgGLwz5X7mHQ4Q";

function ApexApp() {

  // window.addEventListener('online', handleConnection);
  // window.addEventListener('offline', handleConnection);

  // function handleConnection() {
  //   if (navigator.onLine) {
  //     isReachable(getServerUrl()).then(function(online) {
  //       if (online) {
  //         // handle online status
  //         console.log('online');
  //       } else {
  //         console.log('no connectivity');
  //       }
  //     });
  //   } else {
  //     // handle offline status
  //     console.log('offline');
  //   }
  // }

  const [activePage, setActivePage] = useState('/deployment');
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState();

  if(!userLoggedIn){
    getUserCredentials(setUserLoggedIn, setUserDetails)
  }

  if(!userLoggedIn){
    return (
      <LoginPage setUserLoggedIn={setUserLoggedIn} userLoggedIn={userLoggedIn} setUserDetails={setUserDetails}/>
      )
  }
  else{
    return (
      <BrowserRouter>
        <div className='ApexApp'>
          <SideNav activePage={activePage} setActivePage={setActivePage} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
          <div className={menuOpen ? 'DashboardActive' : 'Dashboard'}>
            <TopNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} setUserLoggedIn={setUserLoggedIn} userDetails={userDetails}/>
            <div className='MainPanel'>
            <Routes>
                <Route path='/deployments' element={<ApexDeployments userDetails={userDetails} />}/>
                <Route path='/users' element={<Users userDetails={userDetails} />}/>
                <Route path='/settings' element={<Settings />}/>
                {/* <Route path='/' element={<ApexDeployments userDetails={userDetails} />}/> */}
                <Route path='/' element={<Navigate to="/deployments"/>}/>
            </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  
}

function getUserCredentials(setUserLoggedIn, setUserDetails){
  let token = window.localStorage.getItem('user')
  let firstName = window.localStorage.getItem('firstName')
  let lastName = window.localStorage.getItem('lastName')

  if(token){
    setUserDetails({'firstName': firstName, 'lastName': lastName, 'token': token })
    setUserLoggedIn(true)
  }
}

export default ApexApp;