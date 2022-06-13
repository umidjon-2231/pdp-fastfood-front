import React, {FC} from 'react';
import {parseTime} from "../tools";
import {Order} from "../models/entity/Order";
import clock from '../public/icons/clock.png';
import user from '../public/icons/user.png';
import telephone from '../public/icons/telephone.png';
import clipboard from '../public/icons/clipboard.png';
import truck from '../public/icons/truck.png';
import {NextPage} from "next";

interface OrderCardProps {
    isHorizontal: boolean
    index: number
    item: Order
}

const OrderCard: NextPage<OrderCardProps> = ({isHorizontal, item, index}) => {
    return (
        <div className={`mb-2 order-${isHorizontal ? 'horizontal' : 'vertical'}`}>
                <div className='order-head'>
                    <div className='order-id'>
                        {item.id}
                    </div>
                    {isHorizontal && <hr/>}
                    <div className='order-time'>
                        <img src={clock.src} className='me-2' alt="clock"
                             width={16}/>
                        {parseTime(item.time).toLocaleTimeString().slice(0, 5)}
                    </div>
                </div>
                <div className='order-client'>
                    <div className='d-flex align-items-center mt-2'>
                        <div>
                            <img src={user.src} alt="" width={16}/>
                        </div>
                        <b className='ms-3'>
                            {item.client.name}
                        </b>
                    </div>
                    <div className='d-flex align-items-center mt-3'>
                        <div>
                            <img src={telephone.src} style={{opacity: 0.5}} alt="" width={16}/>
                        </div>
                        <p className='ms-3 mb-0'>
                            {item.client.number}
                        </p>
                    </div>
                </div>
                <div className="order-amount size-14">
                    <div className={`${isHorizontal?'d-flex':'d-none'} align-items-center mt-2`}>
                        <div>
                            <img src={clipboard.src} alt="" width={16}/>
                        </div>
                        <div className='ms-2'>
                            <p className='mb-0'>{item.amount - item.delivery.price} UZS</p>
                        </div>

                    </div>
                    <div className={`${isHorizontal?'d-flex':'d-none'} align-items-center mt-2`}>
                        <div>
                            <img src={truck.src} alt="" width={16}/>
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
    );
};

export default OrderCard;