import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {checkToken, getToken} from "../tools";
import {toast} from "react-toastify";
import {ORDER_STATUS} from "../enums";
import {NextRouter, useRouter} from "next/router";
import WebSocket, {WebSocketResponse} from "../components/WebSocket";
import {Response as UpdateOrderResponse} from "../models/websocket/response/UpdateOrder";
import {Order} from "../models/entity/Order";
import MainModal from "../components/MainModal";
import OrderCard from "../components/OrderCard";
import {NextPage, NextPageContext} from "next";
import {Human} from "../models/entity/Human";
import {GroupedData} from "../models/entity/GroupedData";
import axios, {AxiosResponse} from "axios";
import {Modal} from "reactstrap";
import OrderViewCard from "../components/OrderViewCard";

interface OrderProps {
    user: Human,
    token: string
}

const Orders: NextPage<OrderProps> = ({user}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [orders, setOrders] = useState<Order[]>([])
    const [groupedOrders, setGroupedOrders] = useState<GroupedData<ORDER_STATUS, Order>[]>([])
    const [activeStatus, setActiveStatus] = useState<ORDER_STATUS>(ORDER_STATUS.NEW)
    const [horizontal, setHorizontal] = useState<boolean>(true)
    const [update, setUpdate] = useState<boolean>(false)
    const [viewModal, setViewModal] = useState<boolean>(false)
    const [addModal, setAddModal] = useState<boolean>(false)
    const [viewItem, setViewItem]=useState<Order | null>(null)
    const router: NextRouter = useRouter()

    useEffect(() => {
        changeOrderPosition(horizontal, activeStatus).then(() => {
            console.log("Order list updated")
        })
    }, [update])


    function errorConnectionToast(): void {
        if (!toast.isActive("error_connection")) {
            toast.error("Something went wrong. Try to reload page or check your internet connection", {
                toastId: "error_connection"
            })
        }
    }

    async function getAllOrdersGroupedByStatus(): Promise<void> {
        setLoading(true)
        const req: AxiosResponse<GroupedData<ORDER_STATUS, Order>[]> | void = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + 'order/group/status?desc=true&size=100', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).catch(() => {
        })
        if (req) {
            if (req.status === 200) {
                setGroupedOrders(req.data)
                console.log("Success get all grouped orders")
            } else if (req.status === 403) {
                toast.warn("Your token expired")
                await router.push("/")
            } else {
                errorConnectionToast()
            }
        } else {
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

    async function changeOrderPosition(isHorizontal: boolean = true, status: ORDER_STATUS = activeStatus): Promise<void> {
        setOrders([])
        setGroupedOrders([])
        setHorizontal(isHorizontal)
        if (isHorizontal) {
            await changeActiveStatus(status)
        } else {
            await getAllOrdersGroupedByStatus()
        }
    }


    function toggleViewModal(active: boolean) {
        setViewModal(active)
    }

    function toggleAddModal(active: boolean) {
        setAddModal(active)
    }

    function viewOrder(item: Order):void{
        setViewItem(item)
        toggleViewModal(true)
    }

    function removeViewItem(){
        setViewItem(null)
        toggleViewModal(false)
    }

    type OrdersWebSocketProps = {
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
                               callback: (res: WebSocketResponse, props: OrdersWebSocketProps) => {
                                   let body: UpdateOrderResponse = JSON.parse(res.body)
                                   if (body?.type === 'CREATE') {
                                       if (body.status !== props.activeStatus) {
                                           return;
                                       }
                                   } else if (body?.type === 'UPDATE') {
                                       if (body?.oldStatus !== props.activeStatus && body?.status !== props.activeStatus) {
                                           return
                                       }
                                   }
                                   setUpdate(b => !b)

                               }
                           }
                       ]}
            />
            <Modal/>
            <MainModal loading={false}
                       maxWidth={false}
                       onClose={removeViewItem}
                       toggle={toggleViewModal} isActive={viewModal}>
                <OrderViewCard item={viewItem}/>
            </MainModal>
            <MainModal loading={false} maxWidth={true} toggle={toggleAddModal} isActive={addModal}>
                <div>
                    Salom
                </div>
            </MainModal>
            <div className="" style={{paddingLeft: 2}}>
                <div className='top-nav d-flex align-items-center'>
                    <div className='bg-white d-flex align-items-center px-4 py-3'
                         style={{minWidth: '200px', height: '80px', cursor: 'pointer'}}
                         onClick={() => toggleAddModal(true)}
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
                            <div onClick={() => changeActiveStatus(ORDER_STATUS.NEW)}
                                 className={`item px-5 d-flex align-items-center ${activeStatus === ORDER_STATUS.NEW ? 'active' : ''}`}>
                                <p className='mb-0'>Yangi</p>
                            </div>
                            <div onClick={() => changeActiveStatus(ORDER_STATUS.ACCEPTED)}
                                 className={`item px-4 d-flex align-items-center ${activeStatus === ORDER_STATUS.ACCEPTED ? 'active' : ''}`}>
                                <p className="mb-0">Qabul qilingan</p>
                            </div>
                            <div onClick={() => changeActiveStatus(ORDER_STATUS.SENT)}
                                 className={`item px-4 d-flex align-items-center ${activeStatus === ORDER_STATUS.SENT ? 'active' : ''}`}>
                                <p className="mb-0">Jo’natilgan</p>
                            </div>
                            <div onClick={() => changeActiveStatus(ORDER_STATUS.CLOSED)}
                                 className={`item px-4 d-flex align-items-center ${activeStatus === ORDER_STATUS.CLOSED ? 'active' : ''}`}>
                                <p className="mb-0">Yopilgan</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white d-flex align-items-center px-4" style={{height: 80}}>
                        <div className="scroll-nav">
                            <div onClick={() => changeOrderPosition()}
                                 className={`item d-flex align-items-center ${horizontal ? 'active' : ''}`}>
                                <div style={{padding: '0 3px'}}>
                                    <div style={{width: 14}} className='rectangle'/>
                                    <div style={{width: 14, marginTop: 2}} className='rectangle'/>
                                </div>
                            </div>
                            <div onClick={() => changeOrderPosition(false)}
                                 className={`item d-flex align-items-center ${horizontal ? '' : 'active'}`}>
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

                <div className={`py-3 px-4 body ${horizontal?"":'row m-0'}`} style={{
                    height: 'calc(100vh - 80px)',
                    opacity: viewModal || addModal ? 0.2 : 1,
                    overflowY: viewModal || addModal ? 'hidden' : 'auto'
                }}>
                    {horizontal ? orders?.map((item, index) =>{
                        return(
                            <OrderCard view={viewOrder} key={item.id} isHorizontal={true} index={index} item={item}/>
                        )
                        }
                           ) :
                        groupedOrders.map((groupedData, index) => {
                            return (
                                <div key={index} className="col-3">
                                    <div className="">
                                        <p>{groupedData.title} <b className="bg-white rounded py-1 px-3">{groupedData.content.length}</b></p>
                                    </div>
                                    {groupedData.content.map((item, indexItem)=>{
                                        return(
                                            <OrderCard view={viewOrder} key={item.id} isHorizontal={false} index={indexItem} item={item}/>
                                        )
                                    })}
                                    {groupedData.content.length===0 &&
                                    <div className="d-flex justify-content-center">
                                        <div className="no-data">No data</div>
                                    </div>}

                                </div>

                            )
                        })
                    }
                    {!orders || orders?.length === 0 && horizontal &&
                        <div className="d-flex justify-content-center">
                            <div className="no-data">No data</div>
                        </div>}
                </div>
            </div>

        </Navbar>
    );
};

Orders.getInitialProps = async (ctx: NextPageContext) => {
    const check = await checkToken(ctx)
    return {...check.props}
}

export default Orders;