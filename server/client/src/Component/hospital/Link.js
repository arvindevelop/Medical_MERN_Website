import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const Link = () => {


    return (
        <>
            <div className="d-flex justify-content-between p-5">
                <NavLink to="/rooms" className="nav-link px-0"> <span class="d-none d-sm-inline">Rooms</span></NavLink>
                <NavLink to="/available" className="nav-link px-0"> <span class="d-none d-sm-inline">Available</span></NavLink>
                <NavLink to="/devicelist" className="nav-link px-0"> <span class="d-none d-sm-inline">List</span></NavLink>
                            {/* <p style={{display:"inline-block"}}>12 PM</p>
                            <p style={{display:"inline-block"}}>98.6 F</p>
                            <p style={{display:"inline-block"}}>Normal</p> */}
            </div>
        </>
    )
}

export default Link;