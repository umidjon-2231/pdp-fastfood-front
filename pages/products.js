import React from 'react';
import Navbar from "../components/Navbar";
import {checkToken} from "../tools";

const Products = ({user}) => {
    return (
        <Navbar name="products" user={user}>
            <h1>Products</h1>
            <hr/>
        </Navbar>
    );
};

Products.getInitialProps=async (ctx)=>{
    const check=await checkToken(ctx)
    return {...check.props}
}


export default Products;