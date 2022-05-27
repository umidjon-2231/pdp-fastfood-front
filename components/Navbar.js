import React, {useEffect} from 'react';

const Navbar = ({children, name, user}) => {

    useEffect(()=>{
        console.log(name)
        console.log(user)
    }, [])

    return (
        <div className="full-screen d-flex">
            <div className="left w-25">
                <div className="header">
                    <div className="ava">
                        <img src={process.env.SERVER_HOST_URL+user.photo.url} className="m-3" alt=""/>
                    </div>

                </div>
            </div>
            <div className="main w-75">
                {children}
            </div>
        </div>
    );
};

export default Navbar;