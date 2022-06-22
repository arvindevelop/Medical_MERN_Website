import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Card from '../Card';

const Profilelist = () => {

    const [profiles, setProfiles] = useState([])

    const fetchData = () => {
        console.log("inside fetchdata")
        axios.get('http://localhost:5000/api/v1/profile/all',{ withCredentials: true })
            .then(response => {
                        console.log(response.data)
                        setProfiles(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData()
    },[]);

    console.log(`After axios call ${profiles.allprofile}`);

    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar />
                    <div className="col py-3">
                        <h3>Profile List</h3>
                        {profiles.allprofile===undefined?(<div></div>):profiles.allprofile.map(profile =><Card profile={profile} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profilelist;
