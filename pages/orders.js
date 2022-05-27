import React, {useEffect} from 'react';
import Navbar from "../components/Navbar";
import {checkTokenServerSide} from "../tools";

const Orders = ({user}) => {
    useEffect(()=>{

    }, [])
    return (
        <Navbar name="order" user={user}>
            <h1>Orders</h1>
            <hr/>
        </Navbar>
    );
};

Orders.getInitialProps=async (ctx)=>{
    const check=await checkTokenServerSide(ctx)
    if(check.success){
        return {...check.props}
    }
    return {}
}

export default Orders;