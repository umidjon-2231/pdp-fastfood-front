import React, { useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {checkToken, getToken, parseTime} from "../tools";
import {toast} from "react-toastify";
import {ORDER_STATUS} from "../enums";
import {useRouter} from "next/router";
import WebSocket, {WebSocketResponse} from "../components/WebSocket";
import {Response as UpdateOrderResponse} from "../models/websocket/response/UpdateOrder";
import {Order} from "../models/entity/Order";
import MainModal from "../components/MainModal";


const Orders = ({user}) => {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const [activeStatus, setActiveStatus] = useState(ORDER_STATUS.NEW)
    const [horizontal, setHorizontal] = useState(true)
    const [update, setUpdate] = useState(false)
    const [modal, setModal] = useState(false)
    const router = useRouter()

    useEffect(() => {
        changeOrderPosition(horizontal, activeStatus).then(() => {
            console.log("Order list updated")
        })
    }, [update])



    function errorConnectionToast() :void{
        if (!toast.isActive("error_connection")) {
            toast.error("Something went wrong. Try to reload page or check your internet connection", {
                toastId: "error_connection"
            })
        }
    }

    async function getAllOrders(): Promise<void> {
        setLoading(true)
        const req: Response | void = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'order?desc=true&page=0&size=20', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).catch(()=>{})
        if(req){
            if (req.status === 200) {
                const data = await req.json()
                setOrders(data)
                console.log("Success get all orders")
            } else if (req.status === 403) {
                toast.warn("Your token expired")
                await router.push("/")
            }else {
                errorConnectionToast()
            }
        }
        else {
            errorConnectionToast()
        }
        setLoading(false)
    }

    async function getOrderByStatus(status): Promise<void> {
        setLoading(true)
        try {
            const req: Response | void = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'order?page=0&size=20&desc=true&status=' + status, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                }
            })
            if (req.status === 200) {
                const data = await req.json()
                setOrders(data)
                console.log("Success get order by status")
            } else if (req.status === 403) {
                toast.warn("Your token expired")
                await router.push("/")
            } else {
                errorConnectionToast()
            }
        } catch (e) {
            errorConnectionToast()
        }
        setLoading(false)
    }

    async function changeActiveStatus(status): Promise<void> {
        setActiveStatus(status)
        await getOrderByStatus(status)
    }

    async function changeOrderPosition(isHorizontal: boolean = true, status: ORDER_STATUS=activeStatus): Promise<void> {
        setHorizontal(isHorizontal)
        setOrders([])
        if (isHorizontal) {
            await changeActiveStatus(status)
        } else {
            await getAllOrders()
        }
    }


    function parseOrder(item: Order, index: number) {
        return(
            <div key={index} className={`mb-2 order-${horizontal ? 'horizontal' : 'vertical'}`}>
                <div className={'order-head'}>
                    <div className='order-id'>
                        {item.id}
                    </div>
                    {horizontal?<hr/>:''}
                    <div className='order-time'>
                        <img src="/icons/clock.png" className='me-2' alt="clock"
                             width={16}/>
                        {parseTime(item.time).toLocaleTimeString().slice(0, 5)}
                    </div>
                </div>
                <div className='order-client'>
                    <div className='d-flex align-items-center mt-2'>
                        <div>
                            <img src="/icons/user.png" alt="" width={16}/>
                        </div>
                        <b className='ms-3'>
                            {item.client.name}
                        </b>
                    </div>
                    <div className='d-flex align-items-center mt-3'>
                        <div>
                            <img src="/icons/telephone.png" style={{opacity: 0.5}} alt="" width={16}/>
                        </div>
                        <p className='ms-3 mb-0'>
                            {item.client.number}
                        </p>
                    </div>
                </div>
                <div className="order-amount size-14">
                    <div className={`${horizontal?'d-flex':'d-none'} align-items-center mt-2`}>
                        <div>
                            <img src="/icons/clipboard.png" alt="" width={16}/>
                        </div>
                        <div className='ms-2'>
                            <p className='mb-0'>{item.amount - item.delivery.price} UZS</p>
                        </div>

                    </div>
                    <div className={`${horizontal?'d-flex':'d-none'} align-items-center mt-2`}>
                        <div>
                            <img src="/icons/truck.png" alt="" width={16}/>
                        </div>
                        <div className='ms-2'>
                            <p className='mb-0'>{item.delivery.price} UZS</p>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className={`payType-box`}>
                            <b className='mb-0 ms-2 payType'>{item.payType}</b>
                        </div>

                        <p className='size-12 mb-0 text-muted'>Umumiy summa</p>
                        <p className='size-20 mb-0'><b>{item.amount}</b> UZS</p>
                    </div>
                </div>
                <div className="order-position">
                    <p className='text-muted mb-0 size-12'>Filial:</p>
                    <p className='mb-0'>{item.filial.nameUz}</p>
                    <p className='mb-0'>{item.filial.address}</p>
                </div>
            </div>
        )
    }

    function toggleModal(active: boolean){
        setModal(active)
    }

    type OrdersWebSocketProps={
        horizontal: boolean,
        activeStatus: ORDER_STATUS
    }

    return (
        <Navbar loader={loading} name="orders" user={user}>
            <WebSocket errorCallback={errorConnectionToast}
                       props={{activeStatus, horizontal}}
                       subscribes={[
                           {
                               url: "/update/order",
                               callback: (res: WebSocketResponse, props: OrdersWebSocketProps)=>{
                                   let body: UpdateOrderResponse=JSON.parse(res.body)
                                   if(body?.type==='CREATE'){
                                       if(body.status!==props.activeStatus){
                                           return;
                                       }
                                   }else if (body?.type==='UPDATE'){
                                       if(body?.oldStatus!==props.activeStatus && body?.status!==props.activeStatus){
                                           return
                                       }
                                   }
                                   setUpdate(b=>!b)

                               }}
                       ]}
            />
            <MainModal loading={false} maxWidth={false} toggle={toggleModal} isActive={modal}>
                <div>
                    Salom
                </div>
            </MainModal>
            <div className="" style={{paddingLeft: 2}}>
                <div className='top-nav d-flex align-items-center'>
                    <div className='bg-white d-flex align-items-center px-4 py-3'
                         style={{minWidth: '200px', height: '80px', cursor: 'pointer'}}
                         onClick={()=>{toggleModal(true)}}
                    >
                        <div>
                            <div className="plus"/>
                        </div>
                        <p className="mb-0 size-12 ms-2">Yangi buyurtma qo’shish</p>
                    </div>
                    <div className="bg-white w-100 d-flex align-items-center px-5 py-2" style={{
                        height: 80,
                        marginLeft: 2,
                        marginRight: 2
                    }}>
                        <div className={`scroll-nav ${!horizontal ? 'disabled' : ''}`}>
                            <div onClick={() => {
                                changeActiveStatus(ORDER_STATUS.NEW)
                            }}
                                 className={`item px-5 d-flex align-items-center ${activeStatus === ORDER_STATUS.NEW ? 'active' : ''}`}>
                                <p className='mb-0'>Yangi</p>
                            </div>
                            <div onClick={() => {
                                changeActiveStatus(ORDER_STATUS.ACCEPTED)
                            }}
                                 className={`item px-4 d-flex align-items-center ${activeStatus === ORDER_STATUS.ACCEPTED ? 'active' : ''}`}>
                                <p className="mb-0">Qabul qilingan</p>
                            </div>
                            <div onClick={() => {
                                changeActiveStatus(ORDER_STATUS.SENT)
                            }}
                                 className={`item px-4 d-flex align-items-center ${activeStatus === ORDER_STATUS.SENT ? 'active' : ''}`}>
                                <p className="mb-0">Jo’natilgan</p>
                            </div>
                            <div onClick={() => {
                                changeActiveStatus(ORDER_STATUS.CLOSED)
                            }}
                                 className={`item px-4 d-flex align-items-center ${activeStatus === ORDER_STATUS.CLOSED ? 'active' : ''}`}>
                                <p className="mb-0">Yopilgan</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white d-flex align-items-center px-4" style={{height: 80}}>
                        <div className="scroll-nav">
                            <div onClick={()=>{
                                changeOrderPosition()
                            }}
                                 className={`item d-flex align-items-center ${horizontal ? 'active' : ''}`}>
                                <div style={{padding: '0 3px'}}>
                                    <div style={{width: 14}} className='rectangle'/>
                                    <div style={{width: 14, marginTop: 2}} className='rectangle'/>
                                </div>
                            </div>
                            <div onClick={() => {
                                changeOrderPosition(false)
                            }} className={`item d-flex align-items-center ${horizontal ? '' : 'active'}`}>
                                <div className='d-flex align-items-start' style={{padding: '0 3px'}}>
                                    <div>
                                        <div style={{height: 14, width: 6}} className='rectangle'/>
                                    </div>
                                    <div>
                                        <div style={{height: 10, width: 6, marginLeft: 2}} className='rectangle'/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={`py-3 px-4 body`} style={{
                    height: 'calc(100vh - 80px)',
                    opacity: modal?0.2:1,
                    overflowY: modal?'hidden':'auto'
                }}>
                    {horizontal?orders?.map((item: Order, index: number) => {return parseOrder(item, index)}):
                        orders.map((status, index)=>{
                            return parseOrder(status, index)
                        })
                    }
                    {!orders || orders?.length === 0 ?
                        <div className="d-flex justify-content-center">
                            <div className="no-data">No data</div>
                        </div>

                        : ''}
                </div>
            </div>

        </Navbar>
    );
};

Orders.getInitialProps = async (ctx) => {
    const check = await checkToken(ctx)
    return {...check.props}
}

export default Orders;