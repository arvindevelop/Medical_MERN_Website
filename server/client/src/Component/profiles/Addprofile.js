import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../Sidebar';

const Addprofile = () => {

    const navigate = useNavigate();
    const [profile, setProfile] = useState({id:"", email:"", name:"", age:"", gender:"", weight:""});

    let name,value;
    const handleInputs = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setProfile({...profile,[name]:value});
    }

    const PostData = async (e) =>{
        e.preventDefault();
    
        const {id, email, name, age, gender, weight} = profile;
    
        const res = await fetch('https://remotedeviceinfo.herokuapp.com/api/v1/profile/new',{
          method:"POST",
          credentials: 'include',
          headers:{
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
            id, email, name, age, gender, weight
          })
        });

        const data = await res.json();
        console.log(data);
        if(data.status === 406 || !data){
            window.alert('Invalid detail');
        }
        else if(data.status === 500){
            window.alert("Server error");
        }
        else{
          window.alert("Profile added successfully");
          navigate('/profilelist',{ replace: true });
        }
      }

    return (
        <>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <Sidebar />
                    <div class="col py-3">
                        <h3>Add Profile</h3>
                        <div className="container shadow my-5">
                            <div className="row">
                                <div className="col-lg-6 col-12 ps-5">
                                    <h1 className='display-6 '>Profile</h1>
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Id</label>
                                            <input type="text" name="id" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                            value={profile.id}
                                            onChange={handleInputs}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email address</label>
                                            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                            value={profile.email}
                                            onChange={handleInputs}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                            value={profile.name}
                                            onChange={handleInputs}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Age</label>
                                            <input type="number" name="age" className="form-control" id="exampleInputPassword1" 
                                            value={profile.age}
                                            onChange={handleInputs}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Gender</label>
                                            <input type="text" name="gender" className="form-control" id="exampleInputPassword1" 
                                            value={profile.gender}
                                            onChange={handleInputs}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Weight</label>
                                            <input type="number" name="weight" className="form-control" id="exampleInputPassword1" 
                                            value={profile.weight}
                                            onChange={handleInputs}/>
                                        </div>
                                        <button type="submit" name="signin" className="btn btn-primary" onClick={PostData}>Add Profile</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addprofile;
