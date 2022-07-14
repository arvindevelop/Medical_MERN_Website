import React,{useState} from 'react';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const clientId = process.env.REACT_APP_CLIENT_ID;

function GoogleButton() {

    const [isLogined,setIsLogined] = useState(false);
    const [idToken,setIdToken] = useState('');
    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    console.log(clientId);
    const onLoginSuccess = (res) => {
        //console.log("Login Success! current user: ",res.profileObj);
        //console.log(res.tokenObj.id_token);
        if(res.accessToken)
        {
            setIsLogined(true);
            setIdToken(res.tokenObj.id_token);
            setEmail(res.profileObj.email);
            Cookies.set('GAuth', res.tokenObj.id_token,{ 
                expires: new Date(Date.now() + (3600 * 1000 * 24 * 365 * 1)),
            });
            navigate('/dashboard',{ replace: true });
        }
    }

    const onLoginFailure = (res) => {
        console.log("Login Failed! res: ",res);
    }

    const onLogoutSuccess = (res) => {
        console.log("Logout Success!");
        setIsLogined(false);
        setIdToken('');
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

