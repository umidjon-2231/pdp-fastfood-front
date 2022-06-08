import React, {useEffect, useState} from 'react';
import {webSocketConnection} from "../tools";

const WebSocket = ({subscribes=[], errorCallback, headers={}, props, afterConnect=()=>{}}) => {
    const [stomp, setStomp]=useState(null)
    const [subscriptions, setSubscriptions]=useState({})

    function subscribe(stompClient){
        for (let i = 0; i < subscribes.length && stompClient!==null; i++) {
            let o=subscribes[i]
            let {id}=stompClient.subscribe(o.url, (res)=>{
                let o=subscriptions[res.headers.subscription]
                o.callback(res, props)
            })
            subscriptions[id]=o
            setSubscriptions(subscriptions)
        }
    }
    useEffect(()=>{
        webSocketConnection(errorCallback, headers, afterConnect).then(stomp => {
            setStomp(stomp)
            if(stomp.connected){
               subscribe(stomp)
            }else {
                errorCallback()
            }

        })
    }, [])
    useEffect(()=>{
        if(stomp!==null){
            for (let subscriptionsKey in subscriptions) {
                stomp.subscriptions[subscriptionsKey]=(res)=>{
                    let o=subscriptions[res.headers.subscription]
                    o.callback(res, props)
                }
            }
        }
    }, [props])
    return '';
};

export default WebSocket;