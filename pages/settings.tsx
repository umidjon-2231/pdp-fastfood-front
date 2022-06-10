import React from 'react';
import Navbar from "../components/Navbar";
import {checkToken} from "../tools";

const Settings = ({user}) => {
    return (
        <Navbar name="settings" user={user}>
            <h1>Settings</h1>
            <hr/>
        </Navbar>
    );
};

Settings.getInitialProps=async (ctx)=>{
    const check=await checkToken(ctx)
    return {...check.props}
}


export default Settings;