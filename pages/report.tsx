import React from 'react';
import Navbar from "../components/Navbar";
import {checkToken} from "../tools";

const Report = ({user}) => {
    return (
        <Navbar name="report" user={user}>
            <h1>Report</h1>
            <hr/>
        </Navbar>
    );
};

Report.getInitialProps=async (ctx)=>{
    const check=await checkToken(ctx)
    return {...check.props}
}


export default Report;