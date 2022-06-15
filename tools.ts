import axios, {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {NextPageContext} from "next";
import {Human} from "./models/entity/Human";

export function setCookie(cname: string, cvalue: string, maxAge: number): void {
    const d: Date = new Date();
    d.setTime(d.getTime() + (maxAge * 1000));
    let expires = "expires=" + d.toUTCString();
    if (maxAge === 0) {
        expires = 'Thu, 01 Jan 1970 00:00:00 UTC'
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname): string | null {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

export function getToken(): string {
    return localStorage?.getItem("token") ?? getCookie("token") ?? ""
}

export async function checkToken(ctx: NextPageContext): Promise<{ success: boolean, props?: {user: Human, token: string} }> {
    try {
        let token: string;
        if (ctx.req) {
            token = ctx.req['cookies'].token
        } else {
            token = localStorage?.getItem("token")
            if (token === null) {
                token = getCookie("token")
            }
        }
        const req = await axios.get<AxiosResponse<Human>>(process.env.NEXT_PUBLIC_SERVER_URL + "client/me", {
            headers: {
                "Accept": "application/json",
                "Authorization": 'Bearer ' + token
            }
        })

        if (req.status === 200) {
            const res = req.data
            return {
                props: {
                    user: res.data,
                    token
                },
                success: true
            }
        }

    } catch (e) {}
    if (ctx.req) {
        ctx.res.writeHead(302, {Location: '/'}).end()
    } else {
        window.location.href = '/'
    }

    return {success: false}
}

export function parseTime(time: string): Date {
    return new Date(time)
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function webSocketConnection(errorCallback = () => {
    if (toast.isActive("websocket_default_error")) {
        toast.error("Error websocket connection! Try to reload page", {
            toastId: "websocket_default_error"
        })
    }
}, headers: object = {}, afterConnect = () => {}) {
    // @ts-ignore
    let socket = new SockJS(process.env.NEXT_PUBLIC_SERVER_URL + 'ws');
    // @ts-ignore
    const stompClient = Stomp.over(socket)
    let error = false
    if (process.env.NODE_ENV === "production") {
        stompClient.debug = false
    }
    stompClient.connect({
        Authorization: getToken(),
        ...headers
    }, afterConnect, (e) => {
        error = true
        if (errorCallback) {
            errorCallback()
        }

    })
    while (!stompClient.connected && !error) {
        await sleep(100)
    }
    return stompClient

}

export function logout() :void{
    localStorage.removeItem("token")
    setCookie("token", "", -1)
    window.location.href='/'
}

export function addCommaToNumber(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function addLine(text:string, size: number):string {
    let result:string='';
    for (let i = 0; i < text.length / size; i++) {
        let find = text.slice(i, i + size)
        result+=find+"\n"
    }
    return result
}