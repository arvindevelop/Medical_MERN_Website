import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Login = () => {

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
          headers:{
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
            email,password
          })
        });
        // let data;
        // useEffect(() => {
        //     axios.post('http://localhost:5000/api/v1/auth/login',{
        //         email:user.email,
        //         password: user.password
        //       }).then((response) => {
        //       data = response;
        //     });
        //   }, []);

        const data = await res.json();
        console.log(data);
        if(data.status === 400 || !data){
            window.alert('Invalid detail');
            console.log('Invalid detail');
        }
        else if(data.status === 500){
            window.alert("Server error");
            console.log('Invalid detail');
        }
        else{
          window.alert("Logged In successfully");
          console.log('Logged in successfully');
          window.location.replace('/dashboard');
        }
      }

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
                                <span><NavLink to="/Forgetpassword" className="btn btn-outline-info me-4 rounded-pill px-4">Forgot Password?</NavLink></span>
                            </div>
                            <button type="submit" name="signin" className="btn btn-primary" onClick={PostData}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;