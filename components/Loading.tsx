import React, {FC} from 'react';
import {FadeLoader} from "react-spinners";
import Head from "next/head";
type Props={
    active: boolean
    opacity: boolean
    fullScreen?: boolean
}

const Loading: FC<Props> = ({active, opacity, fullScreen=true}) => {
    if(active){
        return (
            <div className={`${fullScreen?'full-screen':''}
                d-flex align-items-center justify-content-center`} style={{
                position: fullScreen?'fixed':'absolute',
                zIndex: "5",
                background: `rgba(242,242,242,${opacity?0.7:1})`,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }}>
                {!opacity?
                    <Head>
                        <title>Loading...</title>
                    </Head>:''
                }

                <FadeLoader color='#20D472'/>
            </div>
        );
    }else {
        return <></>
    }

};

export default Loading;