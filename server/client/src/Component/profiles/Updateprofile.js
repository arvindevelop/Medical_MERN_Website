import React,{useState} from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Sidebar from '../Sidebar';

const Updateprofile = () => {

    const navigate = useNavigate();
    const {name,age,gender,weight} = useLocation().state;
    const profileName = name;
    const [profile, setProfile] = useState({ name:name, age:age, gender:gender, weight:weight});

    let nameval,value;
    const handleInputs = (e) =>{
        nameval = e.target.name;
        value = e.target.value;

        setProfile({...profile,[nameval]:value});
    }

    const PostData = async (e) =>{
        e.preventDefault();
    
        const {name, age, gender, weight} = profile;
    
        //Here we can't update the profile name because if we change it then in query we will provide wrong param
        const res = await fetch(`https://remotedeviceinfo.herokuapp.com/api/v1/profile/update/${profileName}`,{
          method:"PATCH",
          credentials: 'include',
          headers:{
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
            name, age, gender, weight
          })
        });

        const data = await res.json();
        console.log(data);
        if(data.status === 400 || !data){
            window.alert('Invalid detail');
        }
        else if(data.status === 500){
            window.alert("Server error");
        }
        else{
          window.alert("Profile updated successfully");
          navigate('/profilelist',{ replace: true });
        }
      }

    return (
        <>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <Sidebar />
                    <div class="col py-3">
                        <h3>Update Profile</h3>
                        <div className="container shadow my-5">
                            <div className="row">
                                <div className="col-lg-6 col-12 ps-5">
                                    <h1 className='display-6 '>Personal Information</h1>
                                    <form>
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
                                        <button type="submit" name="save" className="btn btn-primary" onClick={PostData}>Save</button>
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

export default Updateprofile;
