import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Sidebar from '../Sidebar';

const Updateprofile = () => {

    console.log("in update profile")
    console.log(useLocation().state)
    const {id,name,age,gender,weight} = useLocation().state;
    //console.log(props.location)
    return (
        <>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <Sidebar />
                    <div class="col py-3">
                        <h3>Update Profile</h3>
                        <p>{id}</p>
                        <p>{name}</p>
                        <p>{age}</p>
                        <p>{gender}</p>
                        <p>{weight}</p>
                    </div>
                </div>
            </div>
                
           
        </>
    )
}

export default Updateprofile;
