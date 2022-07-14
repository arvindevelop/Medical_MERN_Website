import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Sidebar from './Sidebar';
import Link from './Link';
import RoomTable from './RoomTable';


const Rooms = () => {

    const room = [1,2,3]; 
    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar />
                    <div className="col py-3">
                        <Link />
                        {room.map((ele) => <RoomTable room_no={ele}/>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rooms;