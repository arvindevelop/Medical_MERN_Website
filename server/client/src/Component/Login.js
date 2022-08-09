import React,{useState,useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {gapi} from 'gapi-script';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import GoogleButton from './signin';
//import LogoutButton from './logout';

const clientId = "947184293375-f10uvs9858smohg3luglubcrd7g2jeng.apps.googleusercontent.com"

const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({email:"",password:""});

    let name,value;
    const handleInputs = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }

    const PostData = async (e) =>{
        e.preventDefault();
    
        const {email,password} = user;
    
        const res = await fetch('http://localhost:5000/api/v1/auth/login',{
          method:"POST",
          credentials: 'include', 
          headers:{
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
            email,password
          })
        });

        const data = await res.json();
        if(data.status === 406 || !data){
            window.alert('Invalid detail');
        }
        else if(data.status === 500){
            window.alert("Server error");
        }
        else{
          window.alert("Logged In successfully");
          navigate('/dashboard',{ replace: true });
        }
      }

      useEffect(() =>{
        function start() {
          gapi.client.init({
            clientId: clientId,
            scope:""
          })
        };
        gapi.load('client:auth2',start);
      });

    //   var accessToken = gapi.auth.getToken().access_token;
    //   console.log(accessToken);
    return (
        <>
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-lg-6 col-12 ps-5">
                        <h1 className='display-6 '>Login</h1>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                value={user.email}
                                onChange={handleInputs}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" id="exampleInputPassword1" 
                                value={user.password}
                                onChange={handleInputs}/>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label">Remember me</label>
                                <span><NavLink to="/forgotPassword" className="btn btn-outline-info me-4 rounded-pill px-4">Forgot Password?</NavLink></span>
                            </div>
                            <button type="submit" name="signin" className="btn btn-primary" onClick={PostData}>Login</button>
                        </form>
                    </div>
                    <div className="col-lg-6 col-12 ps-5 text-center my-5">
                        {/* <h1 className='display-6 mx-5'>Google Login</h1>
                        <button name="login" className="btn btn-primary ">Google Login</button> */}
                        <GoogleButton />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;