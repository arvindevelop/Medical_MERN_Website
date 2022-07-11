import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'reactjs-popup/dist/index.css';

const Card = ({profile}) => {

    var {_id,name,email,age,gender,weight} = profile;

    // const x = document.getElementById("link-popup");
    // const handleClick = () => {
    //     console.log('Clickable');
    //     x.style.display="block";
    // }

    return (
        <>
                <div className="col-sm-3">
                    {/* <div className="card" onClick={() => handleClick()} style={{cursor:'pointer'}}> */}
                    <div className="card">
                        <div className="card-body">
                            <ul>
                                <li>{_id}</li>
                                <li>{name}</li>
                                <li>{age}</li>
                                <li>{gender}</li>
                                <li>{weight}</li>
                            </ul>
                            {/* <div className="d-flex justify-content-between" id="link-popup" style={{display:"none"}}> */}
                            <div className="d-flex justify-content-between">
                                <Link to="/updateprofile" state={{ _id: _id,name:name,age:age,gender:gender,weight:weight }}>Update</Link>
                                <Link to="/viewprofile" state={{ name:name, email:email}}>View profile</Link>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Card;
