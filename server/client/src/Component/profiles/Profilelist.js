import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Sidebar from '../Sidebar';
import Card from '../Card';

const Profilelist = () => {

    const [profiles, setProfiles] = useState([])
    const fetchData = () => {
        fetch("http://localhost:5000/api/v1/profile/all")
        .then(response => {
            return response.json()
        })
        .then(data => {
            setProfiles(data)
        })
    }
    // const fetchData = async () => {
    //     const response = await fetch("http://localhost:5000/api/v1/profile/all");
    //     const data = await response.json();
    //     setProfiles(data);
    //   }

    useEffect(() => {
        fetchData()
    },[])

    console.log(profiles);

    return (
        <>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <Sidebar />
                    <div class="col py-3">
                        <h3>Profile List</h3>
                        {profiles.allprofile.map(profile => <Card profile={profile} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profilelist;
