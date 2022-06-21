import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const Card = ({profile}) => {

    const {name,age,gender,weight} = profile;
    return (
        <>
            
                <div class="col-sm-3">
                    <div class="card">
                    <div class="card-body">
                        <ul>
                            <li>{name}</li>
                            <li>{age}</li>
                            <li>{gender}</li>
                            <li>{weight}</li>
                        </ul>
                    </div>
                    </div>
                </div>
           
        </>
    )
}

export default Card;
