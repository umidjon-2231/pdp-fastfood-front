import React from 'react';
import Navbar from "../components/Navbar";
import {checkToken} from "../tools";

const Clients = ({user}) => {
    return (
        <Navbar name="clients" user={user}>
            <h1>Clients</h1>
            <hr/>
        </Navbar>
    );
};

Clients.getInitialProps=async (ctx)=>{
    const check=await checkToken(ctx)
    return {...check.props}
}


export default Clients;