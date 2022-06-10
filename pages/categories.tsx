import React from 'react';
import Navbar from "../components/Navbar";
import {checkToken} from "../tools";

const Categories = ({user}) => {
    return (
        <Navbar name="categories" user={user}>
            <h1>Categories</h1>
            <hr/>
        </Navbar>
    );
};

Categories.getInitialProps=async (ctx)=>{
    const check=await checkToken(ctx)
    return {...check.props}
}


export default Categories;