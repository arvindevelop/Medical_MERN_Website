import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const Card = ({profile}) => {

    const {_id,name,email,age,gender,weight} = profile;
    return (
        <>
                <div className="col-sm-3">
                    <div className="card">
                    <div className="card-body">
                        <ul>
                            <li>{_id}</li>
                            <li>{name}</li>
                            <li>{age}</li>
                            <li>{gender}</li>
                            <li>{weight}</li>
                        </ul>
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
