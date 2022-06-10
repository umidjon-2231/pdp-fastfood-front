import React from 'react';
import Loading from "./Loading";
import {toast} from "react-toastify";

interface Props{
    loading: boolean,
    children: JSX.Element
    toggle(active: boolean): void
    isActive: boolean
    maxWidth?: boolean
}

const MainModal = ({loading, children, toggle, isActive, maxWidth}: Props) => {
    return (
        <div className={`main-modal ${isActive ? 'active' : ''}`}>
            <div className="main-modal-body" style={{
                width: maxWidth?'100vw':'0',
                transition: maxWidth?`right 1s linear`:`right 2s linear`
            }}>
                <div className="main-modal-close" onClick={() => {
                    toggle(false)
                }}>

                    <img src="/icons/x.png" alt=""/>
                </div>
                <Loading active={loading} fullScreen={false} opacity={true}/>
                <div>
                    {children}
                </div>

            </div>

        </div>
    );

};

export default MainModal;