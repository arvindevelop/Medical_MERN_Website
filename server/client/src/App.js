import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import Forgetpassword from './Component/Forgetpassword';
import Sidebar from './Component/Sidebar';
import Profilelist from './Component/profiles/Profilelist';
import Addprofile from './Component/profiles/Addprofile';
import Updateprofile from './Component/profiles/Updateprofile';

 const App = () => {
  return (
    <>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Forgetpassword" element={<Forgetpassword />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/profilelist" element={<Profilelist />} />
          <Route path="/addprofile" element={<Addprofile />} />
          <Route path="/updateprofile" element={<Updateprofile />} />
        </Routes>
    </>
  )
}

export default App;