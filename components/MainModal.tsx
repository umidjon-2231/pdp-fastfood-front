import React, {FC} from 'react';
import Loading from "./Loading";

interface MainModalProps{
    loading: boolean,
    children: JSX.Element
    toggle(active: boolean): void
    isActive: boolean
    maxWidth?: boolean,
    onClose?: ()=>void
}

const MainModal: FC<MainModalProps> = (props) => {
    function close() {
        props.toggle(false)
        if(props.onClose){
            props.onClose()
        }
    }
    return (
        <div onClick={close} className={`main-modal ${props.isActive ? 'active' : ''}`}>

            <div onClick={(e)=>{e.stopPropagation()}} className="main-modal-body" style={{
                width: props.maxWidth?'100vw':'0',
                transition: props.maxWidth?`right 0.5s linear`:`right 1s linear`
            }}>
                <div className="main-modal-close" onClick={close}>
                    <img src="/icons/x.png" alt=""/>
                </div>
                <Loading active={props.loading} fullScreen={false} opacity={true}/>
                <div className="main-modal-content">
                    {props.children}
                </div>

            </div>

        </div>
    );

};

export default MainModal;