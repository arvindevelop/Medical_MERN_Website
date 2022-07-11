import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {Table} from "semantic-ui-react";
import './style.css';

import Sidebar from './Sidebar';

const Dashboard = () => {

    return (
        <>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <Sidebar />
                    <div class="col py-3">
                        <div className="row">
                            <div className='col-9' style={{padding:"2em"}}>
                                <div style={{marginBottom: "3em"}}>
                                    <div style={{display:"inline-block",marginRight:"2em"}}><h3>Analytics</h3></div>
                                    <div style={{display:"inline-block"}}>
                                        <select name="days" id="days">
                                            <option value="10">Last 10 days</option>
                                            <option value="20">Last 20 days</option>
                                            <option value="50">Last 50 days</option>
                                            <option value="100">Last 100 days</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around" style={{marginBottom: "2em"}}>
                                    <div style={{display:"inline-block"}}>
                                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                                        <p>Profile</p>
                                        <p>12</p>
                                    </div>
                                    <div style={{display:"inline-block"}}>
                                        <i className="fa fa-ban" aria-hidden="true"></i>
                                        <p>Active</p>
                                        <p>1</p>
                                    </div>
                                    <div style={{display:"inline-block"}}>
                                        <i className="fa fa-smile-o" aria-hidden="true"></i>
                                        <p>Share</p>
                                        <p>4</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex justify-content-between my-0" style={{padding:"1em",width:"50%"}}>
                                        <div style={{display:"inline-block"}}><h4>Table Title</h4></div>
                                        <div style={{display:"inline-block"}}><p>Show 10 items</p></div>
                                    </div>
                                    <Table celled className="table-ui">
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>First Name, Last Name</Table.HeaderCell>
                                                <Table.HeaderCell>Date</Table.HeaderCell>
                                                <Table.HeaderCell>Active</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>Arvind Kumar Singh</Table.Cell>
                                                <Table.Cell>28/06/2022</Table.Cell>
                                                <Table.Cell>Active</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Arvind Kumar Singh</Table.Cell>
                                                <Table.Cell>28/06/2022</Table.Cell>
                                                <Table.Cell>Active</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Arvind Kumar Singh</Table.Cell>
                                                <Table.Cell>28/06/2022</Table.Cell>
                                                <Table.Cell>Active</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className="card m-5" style={{alignItems:"center",backgroundColor:"#F1948A"}}>
                                    <div className="card-body">
                                        <h2 className="card-title">450 Hrs</h2>
                                        <p>Total usage</p>
                                    </div>
                                </div>
                                <div className="card m-5" style={{alignItems:"center",backgroundColor:"#AED6F1"}}>
                                    <div className="card-body">
                                        <h2 className="card-title">450 Hrs</h2>
                                        <p>Total usage</p>
                                    </div>
                                </div>
                                <div className="card m-5" style={{alignItems:"center",backgroundColor:"#F1948A"}}>
                                    <div className="card-body">
                                        <h2 className="card-title">2 New</h2>
                                        <p>Devices Added</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
