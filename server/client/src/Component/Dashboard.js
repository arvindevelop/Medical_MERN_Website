import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {NavLink, useHistory} from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {

    return (
        <>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <Sidebar />
                    <div class="col py-3">
                        <h3>DashBoard</h3>
                        <p class="lead">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nam blanditiis quis sequi optio, eius neque sit sapiente, quod provident ipsa ratione suscipit commodi expedita! Error hic laborum dolore atque!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
