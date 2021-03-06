import React, {FC, useEffect, useState} from 'react';
import {NextRouter, useRouter} from "next/router";
import Image from "next/image";
import Loading from "./Loading";
import {logout, setCookie} from "../tools";
import Title from "./Title";
import {Human} from "../models/entity/Human";
import logoutImg from '../public/icons/log-out.png'

interface NavbarProps {
    children: any
    name: string,
    user: Human,
    loader?: boolean
}

const Navbar: FC<NavbarProps> = ({children, name, user, loader = false}) => {
    const router: NextRouter = useRouter()
    const menu = [
        {
            title: 'Buyurtmalar',
            icon: '/icons/check-circle.png',
            activeIcon: '/icons/check-circle-active.png',
            name: 'orders'
        },
        {
            title: 'Mahsulotlar',
            icon: '/icons/archive.png',
            activeIcon: '/icons/archive-active.png',
            name: 'products'
        },
        {
            title: 'Kategoriyalar',
            icon: '/icons/layers.png',
            activeIcon: '/icons/layers-active.png',
            name: 'categories'
        },
        {
            title: 'Filiallar',
            icon: '/icons/map-pin.png',
            activeIcon: '/icons/map-pin-active.png',
            name: 'filials'
        },
        {
            title: 'Mijozlar',
            icon: '/icons/users.png',
            activeIcon: '/icons/users-active.png',
            name: 'clients'
        },
        {
            title: 'Xisobot',
            icon: '/icons/bar-chart-2.png',
            activeIcon: '/icons/bar-chart-2-active.png',
            name: 'report'
        },
        {
            title: 'Sozlamalar',
            icon: '/icons/settings.png',
            activeIcon: '/icons/settings-active.png',
            name: 'settings'
        }
    ]
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            localStorage.removeItem('token')
            setCookie('token', '', 0)
            router.push('/').then(() => {
            })
            return
        }
        setLoading(false)


    }, [])

    return (
        <div className="full-screen d-flex">
            <Title name={name.slice(0, 1).toUpperCase() + name.slice(1)}/>
            <Loading active={loading} opacity={true}/>
            <div className="left">
                <div className="header px-3 pt-4 pb-5 d-flex align-items-center">
                    <div className="ava">
                        <Image width={50} height={50}
                               src={process.env.NEXT_PUBLIC_SERVER_HOST_URL + (user?.photo.url ?? '/api/assets/image-not-found.png')}
                               className="" alt=""/>
                    </div>
                    <div className='ms-3'>
                        <b>{user?.name ?? 'Unknown'}</b>
                    </div>
                </div>

                <div className="menu">
                    {menu.map((item) => {
                        return (
                            <div onClick={() => router.push('/' + item.name)}
                                 key={Math.random()} className={`item d-flex align-items-center
                                                ${name === item.name ? 'active' : ''} py-2`}>
                                <div
                                    className={`h-100 d-flex align-items-center ${name === item.name ? 'icon-bg-tr' : 'icon-bg'}`}>
                                    <img src={name === item.name ? item.activeIcon : item.icon} alt="" width={16}
                                         height={16}/>
                                </div>
                                <div className="ms-3">
                                    <p className='my-2'>{item.title}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="logout">
                    <div className="d-flex" onClick={logout} style={{cursor: 'pointer'}}>
                        <div className="icon-bg me-2">
                            <img src={logoutImg.src} style={{verticalAlign: 'baseline'}} alt="logout-icon"/>
                        </div>
                        <div className='d-flex align-items-center'>
                            <p className="mb-0">Chiqish</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="main position-relative">
                <Loading opacity={true} active={loader} fullScreen={false}/>
                {children}
            </div>
        </div>
    );
};

export default Navbar;