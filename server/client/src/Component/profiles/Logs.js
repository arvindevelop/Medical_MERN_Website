import React from 'react';
import '../style.css';

const Logs = ({label,value}) => {


        const obj = {};
        const obj1 = {};
        if(label !== undefined && value !== undefined){
            label.forEach((element, index) => {
            obj[element] = value[index];
            obj1[element] = (value[index] * (9/5)) + 32;
            });
        }

        function getReadingInCel()
        {
            const names = [];
            Object.keys(obj).forEach( function(key) {
            names.push(<div className="d-flex justify-content-between">
                            <p style={{display:"inline-block"}}>{key}</p>
                            <p style={{display:"inline-block"}}>{obj[key]}</p>
                        </div>
                       )
            })
            return names;
        }
        function getReadingInFar()
        {
            const names = [];
            Object.keys(obj1).forEach( function(key) {
            names.push(<div className="d-flex justify-content-between">
                            <p style={{display:"inline-block"}}>{key}</p>
                            <p style={{display:"inline-block"}}>{obj1[key]}</p>
                        </div>
                       )
            })
            return names;
        }

        function getParameter(){
            var x = document.getElementById('login1');
            var y = document.getElementById('register1');
            var z = document.getElementById('btn1');
            return [x,y,z];
        }
        function F()
        {
            const [x,y,z] = getParameter();
            x.style.left = '-400px';
            y.style.left = '50px';
            z.style.left = '110px';
        }
        function C()
        {
            const [x,y,z] = getParameter();
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
                        <button type="button" onClick={C} className="toggle-btn1" style={{marginLeft:"-5px"}}>Celcius</button>
                        <button type="button" onClick={F} className="toggle-btn1" style={{marginLeft:"-5px"}}>Farenhite</button>
                    </div>
                    <div id="login1" className="input-group-login1">
                        {obj===undefined?(<div></div>):getReadingInCel()}
                        
                        {/* <div className="d-flex justify-content-between">
                                    <p style={{display:"inline-block"}}>11 PM</p>
                                    <p style={{display:"inline-block"}}>37.2 C</p>
                                    <p style={{display:"inline-block"}}>Normal</p>
                        </div> */}
                    </div>
                    <div id="register1" className="input-group-register1">
                        {obj===undefined?(<div></div>):getReadingInFar()}
                        {/* <div className="d-flex justify-content-between">
                                    <p style={{display:"inline-block"}}>12 PM</p>
                                    <p style={{display:"inline-block"}}>98.6 F</p>
                                    <p style={{display:"inline-block"}}>Normal</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Logs;
