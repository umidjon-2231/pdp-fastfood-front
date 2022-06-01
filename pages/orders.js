import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {checkToken, parseTime} from "../tools";
import * as process from "../next.config";
import {toast} from "react-toastify";
import Image from "next/image";
import {ORDER_STATUS} from "../constants";
import {useRouter} from "next/router";

const Orders = ({user, token}) => {
    const [loading, setLoading]=useState(true)
    const [orders, setOrders]=useState([])
    const [activeStatus, setActiveStatus]=useState(ORDER_STATUS.NEW)
    const [horizontal, setHorizontal]=useState(true)
    const [update, setUpdate]=useState(false)
    const router=useRouter()
    useEffect(()=>{
        connectWebSocket().then(()=>{
            getOrderByStatus(activeStatus).catch((e)=>{
                console.log(e)
            })
        })

    }, [])

    useEffect(()=>{
        changeOrderPosition(horizontal).then(()=>{
            console.log("Order list updated")
        })
    }, [update])

    async function connectWebSocket(){
        let socket = new SockJS(process.env.SERVER_URL+'ws');
        const stompClient = Stomp.over(socket)

        await stompClient.connect({}, ()=>{
            console.log("connected")
            stompClient.subscribe("/update/order", (res)=>{
                setUpdate(u=>!u)
            })
        }, (e)=>{
            toast.error("Something went wrong. Try to reload page or check your internet connection")
        })
    }

    async function getAllOrders(){
        setLoading(true)
        const req=await fetch(process.env.SERVER_URL+'order?desc=true&page=0&size=20', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        if(req.status===200){
            const data=await req.json()
            setOrders(data)
            console.log("Success get all orders")
        }
        else if(req.status===403){
            toast.warn("Your token expired")
            await router.push("/")
        }
        else {
            toast.error('Something went wrong')
        }
        setLoading(false)
    }

    async function getOrderByStatus(status) {
        setLoading(true)
        try {
            const req=await fetch(process.env.SERVER_URL+'order?page=0&size=20&desc=true&status='+status, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            if(req.status===200){
                const data=await req.json()
                setOrders(data)
                console.log("Success get order by status")
            }else if(req.status===403){
                toast.warn("Your token expired")
                await router.push("/")
            }
            else {
                toast.error('Something went wrong')
            }
        }catch (e) {
            toast.error("Something went wrong. Check your internet connection")
        }

        setLoading(false)
    }

    async function changeActiveStatus(status) {
        setActiveStatus(status)
        await getOrderByStatus(status)
    }

    async function changeOrderPosition(isHorizontal=true) {
        setHorizontal(isHorizontal)
        if(isHorizontal){
            await changeActiveStatus(activeStatus)
        }else {
            await getAllOrders()
        }
    }



    return (
        <Navbar loader={loading} name="orders" user={user}>
            <div className="ps-1">
                <div className='top-nav d-flex align-items-center'>
                    <div className='bg-white d-flex align-items-center px-4 py-3'
                         style={{minWidth: '200px', height: '80px'}}>
                        <div>
                            <div className="plus"/>
                        </div>
                        <p className="mb-0 size-12 ms-2">Yangi buyurtma qo’shish</p>
                    </div>
                    <div className="bg-white w-100 d-flex align-items-center mx-1 px-5 py-2" style={{height: 80}}>
                        <div className={`scroll-nav ${!horizontal?'disabled':''}`}>
                            <div onClick={()=>{changeActiveStatus(ORDER_STATUS.NEW)}} className={`item px-5 d-flex align-items-center ${activeStatus===ORDER_STATUS.NEW?'active':''}`}>
                                <p className='mb-0'>Yangi</p>
                            </div>
                            <div onClick={()=>{changeActiveStatus(ORDER_STATUS.ACCEPTED)}} className={`item px-4 d-flex align-items-center ${activeStatus===ORDER_STATUS.ACCEPTED?'active':''}`}>
                                <p className="mb-0">Qabul qilingan</p>
                            </div>
                            <div onClick={()=>{changeActiveStatus(ORDER_STATUS.SENT)}} className={`item px-4 d-flex align-items-center ${activeStatus===ORDER_STATUS.SENT?'active':''}`}>
                                <p className="mb-0">Jo’natilgan</p>
                            </div>
                            <div onClick={()=>{changeActiveStatus(ORDER_STATUS.CLOSED)}} className={`item px-4 d-flex align-items-center ${activeStatus===ORDER_STATUS.CLOSED?'active':''}`}>
                                <p className="mb-0">Yopilgan</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white d-flex align-items-center px-4" style={{height: 80}}>
                        <div className="scroll-nav">
                            <div onClick={changeOrderPosition} className={`item d-flex align-items-center ${horizontal?'active':''}`}>
                                <div style={{padding: '0 3px'}}>
                                    <div style={{width: 14}} className='rectangle'/>
                                    <div style={{width: 14, marginTop: 2}} className='rectangle'/>
                                </div>
                            </div>
                            <div onClick={()=>{changeOrderPosition(false)}} className={`item d-flex align-items-center ${horizontal?'':'active'}`}>
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
                <div className="py-3 px-4 body" style={{height: 'calc(100vh - 80px)'}}>
                    {orders?.map((item, index)=>{
                        return(
                            <div key={index} className={`mb-2 order-${horizontal?'horizontal':'vertical'}`}>
                                <div className={'order-head'}>
                                    <div className='order-id'>
                                        {item.id}
                                    </div>
                                    <hr/>
                                    <div className='order-time'>
                                        <img src="/icons/clock.png" className='me-2' alt="clock"
                                               width={16}/>
                                        {parseTime(item.time).toLocaleTimeString().slice(0,5)}
                                    </div>
                                </div>
                                <div className='order-client'>
                                    <div className='d-flex align-items-center mt-2'>
                                        <div>
                                            <img src="/icons/user.png" alt="" width={16}/>
                                        </div>
                                        <b className='ms-2'>
                                            {item.client.name}
                                        </b>
                                    </div>
                                    <div className='d-flex align-items-center mt-3'>
                                        <div>
                                            <img src="/icons/telephone.png" style={{opacity: 0.5}} alt="" width={16}/>
                                        </div>
                                        <p className='ms-2 mb-0'>
                                            {item.client.number}
                                        </p>
                                    </div>
                                </div>
                                <div className="order-amount size-14">
                                    <div className="d-flex align-items-center mt-2">
                                        <div>
                                            <img src="/icons/clipboard.png" alt="" width={16}/>
                                        </div>
                                        <div className='ms-2'>
                                            <p className='mb-0'>{item.amount-item.delivery.price} UZS</p>
                                        </div>
                                        <div className='ms-3'>
                                            <b className='mb-0 ms-2 payType'>{item.payType}</b>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mt-2">
                                        <div>
                                            <img src="/icons/truck.png" alt="" width={16}/>
                                        </div>
                                        <div className='ms-2'>
                                            <p className='mb-0'>{item.delivery.price} UZS</p>
                                        </div>
                                    </div>
                                    <div className='mt-2'>
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
                    })}
                    {!orders||orders?.length===0?
                        <div className="d-flex justify-content-center">
                            <div onClick={connectWebSocket} className="no-data">No data</div>
                        </div>

                        :''}
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