import React from 'react';
import Cookies from 'js-cookie';
import {Routes, Route} from 'react-router-dom';

import Login from './Component/Login';
import Forgetpassword from './Component/views/forgotPassword';

import Dashboard from './Component/profiles/Dashboard';
import Sidebar from './Component/profiles/Sidebar';
import Profilelist from './Component/profiles/Profilelist';
import Addprofile from './Component/profiles/Addprofile';
import Updateprofile from './Component/profiles/Updateprofile';
import Viewprofile from './Component/profiles/Viewprofile';

// import Rooms from './Component/hospital/Rooms';
// import Available from './Component/hospital/Available';
// import DeviceList from './Component/hospital/DeviceList';

 const App = () => {

  const token =  Cookies.get('jwt');
  const googleToken = Cookies.get('GAuth');

   

  return (
    <>
        <Routes>
          <Route exact path="/" element={googleToken || token ? <Dashboard /> : <Login />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgotPassword" element={<Forgetpassword />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/profilelist" element={<Profilelist />} />
          <Route path="/addprofile" element={<Addprofile />} />
          <Route path="/updateprofile" element={<Updateprofile />} />
          <Route path="/viewprofile" element={<Viewprofile />} />
          {/* <Route path="/rooms" element={<Rooms />} />
          <Route path="/available" element={<Available />} />
          <Route path="/devicelist" element={<DeviceList />} /> */}
        </Routes>
    </>
  )
}

export default App;