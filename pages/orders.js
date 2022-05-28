import React, {useEffect} from 'react';
import Navbar from "../components/Navbar";
import {checkToken} from "../tools";

const Orders = ({user}) => {
    useEffect(()=>{

    }, [])
    return (
        <Navbar name="orders" user={user}>
            <div className="px-1">
                <div className='top-nav'>
                    <div className='bg-white px-4 py-3' style={{width: '200px'}}>
                        <b>Orders</b>
                    </div>
                </div>
            </div>

        </Navbar>
    );
};

Orders.getInitialProps=async (ctx)=>{
    const check=await checkToken(ctx)
    return {...check.props}
}

export default Orders;