import React from 'react';
import {useHistory, BrowserRouter, Routes, Route} from 'react-router-dom';
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
      <BrowserRouter>
        <Routes history={useHistory}>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Forgetpassword" element={<Forgetpassword />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/profilelist" element={<Profilelist />} />
          <Route path="/addprofile" element={<Addprofile />} />
          <Route path="/updateprofile" element={<Updateprofile />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;