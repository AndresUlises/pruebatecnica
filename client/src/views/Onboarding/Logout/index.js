import { func } from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function LogoutHandler() {

    const history = useHistory();

    function handleLogout() {
        console.log('Exit from App');

        Cookies.remove('AUTH_TOKEN');
        history.push("/singing");
    }

    return (<button type="button" onClick={handleLogout} >Logging Out</button>);
}

export default LogoutHandler;