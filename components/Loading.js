import React from 'react';
import {FadeLoader} from "react-spinners";
import Head from "next/head";

const Loading = ({active, opacity}) => {
    if(active){
        return (
            <div className="full-screen d-flex align-items-center justify-content-center" style={{
                position: 'fixed',
                zIndex: "5",
                background: `rgba(242,242,242,${opacity?0.7:1})`
            }}>
                <Head>
                    <title>Loading...</title>
                </Head>
                <FadeLoader color='#20D472'/>
            </div>
        );
    }else {
        return ""
    }

};

export default Loading;