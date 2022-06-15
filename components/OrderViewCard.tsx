import React from 'react';
import {Order} from "../models/entity/Order";
import {NextPage} from "next";
import clock from "../public/icons/clock.png";
import {addCommaToNumber, addLine, parseTime} from "../tools";
import user from "../public/icons/user.png";
import clipboard from "../public/icons/clipboard.png";
import truck from "../public/icons/truck.png";


interface OrderViewCardProps {
    readonly item: Order | null
}

const OrderViewCard: NextPage<OrderViewCardProps> = ({item}) => {
    return (
        <div className="order-view">
            <div className='order-head'>
                <div className='order-id'>
                    {item?.id}
                </div>
                <div className='order-time'>
                    <img src={clock.src} className='me-2' alt="clock"
                         width={16}/>
                    {parseTime(item?.time).toLocaleTimeString().slice(0, 5)}
                </div>
            </div>
            <div className='order-client'>
                <div className='d-flex align-items-center mt-2'>
                    <div>
                        <img src={user.src} alt="" width={16}/>
                    </div>
                    <b className='ms-3'>
                        {item?.client.name}
                    </b>
                </div>
                <div className='d-flex align-items-center mt-3' style={{marginLeft: 'calc(16px + 1rem)'}}>
                    <p className='mb-0'>
                        {item?.client.number}
                    </p>
                </div>
            </div>
            <div className="order-position">
                <div className="w-50">
                    <p className='text-muted mb-0' style={{fontSize: '13px'}}>Operator:</p>
                    <b className='mb-0'>{item?.operator?.name ?? "Unknown"}</b>
                </div>
                <div className="w-50">
                    <p className='text-muted mb-0' style={{fontSize: '13px'}}>Filial:</p>
                    <b className='mb-0'>{item?.filial.nameUz}</b>
                    <p className='mb-0 text-muted'>{item?.filial.address}</p>
                </div>
            </div>
            <div className="order-products">
                <table className="table table-hover ">
                    <thead>
                    <tr>
                        <td className="w-50">MAXSULOTLAR</td>
                        <td className="w-50">SONI | Narxi</td>
                    </tr>
                    </thead>
                    <tbody>
                    {item?.products.map((i, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <p className="mb-0">{addLine(i.product.nameUz, 15)}</p>
                                </td>
                                <td>
                                    <b>{i.count}*{addCommaToNumber(i.price)}</b> UZS
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div className="order-amount size-14">
                <div className={`d-flex align-items-center mt-2 w-50`}>
                    <div>
                        <img src={clipboard.src} alt="" width={16}/>
                    </div>
                    <div className='ms-2'>
                        <p className='mb-0'>{item?.amount - item?.delivery.price} UZS</p>
                    </div>

                </div>
                <div className={`d-flex align-items-center mt-2 w-50`}>
                    <div>
                        <img src={truck.src} alt="" width={16}/>
                    </div>
                    <div className='ms-2'>
                        <p className='mb-0'>{item?.delivery.price} UZS</p>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className={`payType-box`}>
                        <b className='mb-0 ms-2 payType'>{item?.payType}</b>
                    </div>

                    <p className='size-12 mb-0 text-muted'>Umumiy summa</p>
                    <p className='size-20 mb-0'><b>{item?.amount}</b> UZS</p>
                </div>
            </div>
            <div className="order-control">
                <div className="not-accept">
                    <div>
                        <img src="/icons/x.png" alt="" width={10} height={10}/>
                    </div>
                </div>
                <div className="accept ms-3">
                    <div>
                        <img src="/icons/accept.png" alt="" width={14} height={9.62}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderViewCard;