import React from 'react';
import {NavLink} from 'react-router-dom';
import './style.css';

const ViewTemp = () => {

        var x = document.getElementById('login1');
        var y = document.getElementById('register1');
        var z = document.getElementById('btn1');
        function C()
        {
            x.style.left = '-400px';
            y.style.left = '50px';
            z.style.left = '110px';
        }
        function F()
        {
            x.style.left = '50px';
            y.style.left = '450px';
            z.style.left = '0px';
        }
    return (
        <>
            <div id="login-form1" className="login-page1">
                <div className="form-box1">
                    <div className="button-box1">
                        <div id="btn1"></div>
                        <button type="button" onClick={C} className="toggle-btn1">Celcius</button>
                        <button type="button" onclick={F} className="toggle-btn1">Faren</button>
                    </div>
                    <div id="login1" className="input-group-login1">
                        <div className="d-flex justify-content-between" style={{padding:"1em"}}>
                                    <div style={{display:"inline-block"}}><p>12 PM</p></div>
                                    <div style={{display:"inline-block"}}><p>37 c</p></div>
                        </div>
                        <div className="d-flex justify-content-between" style={{padding:"1em"}}>
                                    <div style={{display:"inline-block"}}><p>12 PM</p></div>
                                    <div style={{display:"inline-block"}}><p>37 c</p></div>
                        </div>
                    </div>
                    <form id="register1" className="input-group-register1">
                        <input type="text" className="input-field1" placeholder="First Name" name="first_name" required/>
                        <input type="text" className="input-field1" placeholder="Last Name" name="last_name" required/>
                        <input type="email" className="input-field1" placeholder="Email Id" name="email" required/>
                        <input type="password" className="input-field1" placeholder="Enter password" name="password" required/>
                        <input type="text" className="input-field1" placeholder="Enter College Name" name="college" required/>
                        
                    </form>
                </div>
            </div>
        </>
    )
}

export default ViewTemp;
