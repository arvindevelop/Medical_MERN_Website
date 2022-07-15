import React,{useState} from 'react';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const clientId = process.env.REACT_APP_CLIENT_ID;

function GoogleButton() {

    const [isLogined,setIsLogined] = useState(false);
    const navigate = useNavigate();

    const onLoginSuccess = async (res) => {
        
        if(res.accessToken)
        {
            setIsLogined(true);
            
            const userName = res.profileObj.name;
            const email = res.profileObj.email;
            const _id = res.profileObj.googleId;

            Cookies.set('GAuth', res.tokenObj.id_token,{ 
                expires: new Date(Date.now() + (3600 * 1000 * 24 * 365 * 1)),
            });

            try{

                const user = await fetch(`http://localhost:5000/api/v1/auth/${email}`,{
                    method:"GET",
                    credentials: 'include', 
                    headers:{
                        "Content-Type" : "application/json"
                    }
                });

                const userdata = await user.json();
                //console.log(userdata.status);
                if(userdata.status !== 201){

                    try{
                    const afterRegister = await fetch('http://localhost:5000/api/v1/auth/register',{
                        method:"POST",
                        credentials: 'include', 
                        headers:{
                            "Content-Type" : "application/json"
                        },
                        body:JSON.stringify({
                            _id,userName,email
                        })
                    });

                    const registerdata = await afterRegister.json();
                    //console.log(registerdata);
                    if(registerdata.message === "success"){
                        navigate('/dashboard',{ replace: true });
                    }
                    }catch(err)
                    {
                        console.log(`register data error: ${err}`);
                    }
                }
                else if(userdata.status === 201){
                    navigate('/dashboard',{ replace: true });
                }
            } 
            catch(err)
            {
                console.log(err);
            }
        }
    }

    const onLoginFailure = (res) => {
        console.log("Login Failed! res: ",res);
    }

    const onLogoutSuccess = (res) => {
        console.log("Logout Success!");
        setIsLogined(false);
        // setIdToken('');
    }

    const onLogoutFailure = (res) => {
        console.log("Logout Failed! res: ",res);
    }

    return(
        <div>
            {isLogined?
            <GoogleLogout
            clientId={clientId}
            buttonText="Google Logout"
            onLogoutSuccess={onLogoutSuccess}
            onFailure={onLogoutFailure}
            ></GoogleLogout> :
                <GoogleLogin
                clientId={clientId}
                buttonText="Google Login"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                responseType='code,token'
                ></GoogleLogin>
            }
            
        </div>
        
    )
}

export default GoogleButton;

