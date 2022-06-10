import React from 'react';
import Navbar from "../components/Navbar";
import {checkToken} from "../tools";

const Filials = ({user}) => {
    return (
        <Navbar name="filials" user={user}>
            <h1>Filials</h1>
            <hr/>
        </Navbar>
    );
};

Filials.getInitialProps=async (ctx)=>{
    const check=await checkToken(ctx)
    return {...check.props}
}


export default Filials;