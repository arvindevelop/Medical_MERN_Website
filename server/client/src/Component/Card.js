import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const Card = ({profile}) => {

    const {id,name,age,gender,weight} = profile;
    return (
        <>
                <div className="col-sm-3">
                    <div className="card">
                    <div className="card-body">
                        <ul>
                            <li>{id}</li>
                            <li>{name}</li>
                            <li>{age}</li>
                            <li>{gender}</li>
                            <li>{weight}</li>
                        </ul>
                        {/* <Link to="/updateprofile" state={{ id: id,name:name,age:age,gender:gender,weight:weight }}>Update</Link> */}
                        <div className="d-flex justify-content-between">
                            <Link to="/updateprofile" state={{ id: id,name:name,age:age,gender:gender,weight:weight }}>Update</Link>
                            <Link to="/viewprofile">View profile</Link>
                        </div>
                    </div>
                    </div>
                </div>
        </>
    )
}

export default Card;
