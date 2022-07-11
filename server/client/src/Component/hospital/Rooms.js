import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Sidebar from './Sidebar';
import Link from './Link';


const Rooms = () => {


    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar />
                    <div className="col py-3">
                        <Link />
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Room 1</th>
                                <th scope="col">DeviceName</th>
                                <th scope="col">Name</th>
                                <th scope="col">Id</th>
                                <th scope="col">Added on</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>11-07--2022</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>11-07--2022</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                <td>11-07--2022</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rooms;