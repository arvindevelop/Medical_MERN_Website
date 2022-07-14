import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const RoomTable = ({room_no}) => {


    return (
        <>
            <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Room {room_no}</th>
                                <th scope="col">DeviceName</th>
                                <th scope="col">Name</th>
                                <th scope="col">Id</th>
                                <th scope="col">Added on</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row"><img href="#" alt="deviceImg"></img></th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>11-07--2022</td>
                                </tr>
                                <tr>
                                <th scope="row"><img href="#" alt="deviceImg"></img></th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>11-07--2022</td>
                                </tr>
                                <tr>
                                <th scope="row"><img href="#" alt="deviceImg"></img></th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                <td>11-07--2022</td>
                                </tr>
                            </tbody>
                        </table>
        </>
    )
}

export default RoomTable;