import {GoogleLogout} from 'react-google-login';

const clientId = "947184293375-f10uvs9858smohg3luglubcrd7g2jeng.apps.googleusercontent.com";

function Logout() {

    const onSuccess = () => {
        console.log("Log out Successfull!");
    }

    return(
        <div id="signOutButton">
            <GoogleLogout
            clientId={clientId}
            buttonText="Google Logout"
            onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    )
}

export default Logout;

