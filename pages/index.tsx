import React, {useEffect, useState} from "react";
import {AvField, AvForm} from 'availity-reactstrap-validation'
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {getCookie, setCookie} from "../tools";
import Loading from "../components/Loading";
import Title from "../components/Title";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [opacity, setOpacity] = useState(false);

    useEffect(() => {
        fetchData().then(() => {
            setLoading(false)
            setOpacity(true)
        })
    }, [])

    const router = useRouter()

    async function fetchData(): Promise<void> {
        try {
            let token = localStorage.getItem("token")
            if (!token) {
                token = getCookie("token")
            }
            if (token) {
                const req: Response | void = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "auth/token/check", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                }).catch(() => {
                })
                if (req) {
                    if (req.status === 200) {
                        const body = await req.json()

                        if (body.success === true) {
                            setCookie("token", token, (body.data.exp - new Date().getTime()) / 1000)
                            await router.push("/orders")
                        }
                    } else {
                        localStorage.removeItem("token")
                    }
                }
            }
        } catch (e) {
        }

    };

    const login = async (e, v: { number: string, password: string }): Promise<void> => {
        setLoading(true)
        try {
            const req: Response | void = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "auth/token/get", {
                body: JSON.stringify({
                    login: v.number,
                    password: v.password
                }),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).catch(() => {
            })
            if (req) {
                const res = await req.json()
                if (req.status === 200) {
                    localStorage.setItem("token", res.token)
                    setCookie("token", res.token, 7200)
                    toast.success("Success authenticated!")
                    await router.push("/orders")
                } else {
                    toast.error(res["message"] ? res.message : "Something went wrong")
                }
            } else {
                throw new Error("")
            }
        } catch (e) {
            if (!toast.isActive("unknown_error")) {
                toast.error("Something went wrong. Please check your connection!", {
                    toastId: "unknown_error"
                })
            }

        }
        setLoading(false)
    };

    return (<>
        <Title name="PDP fastfood"/>
        <Loading active={loading} opacity={opacity}/>
        <div className="login full-screen">
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-3 ms-auto my-auto">
                        <h4>Tizimga xush kelibsiz!</h4>
                        <p>
                            Tizimga kirish uchun, login va parol orqali
                            autentifikatsiya jarayonidan o???ting
                        </p>
                        <AvForm onValidSubmit={login}>
                            <AvField type="text" label="Number"
                                     name="number" placeholder="e.x: +998901234567"
                                     validate={{
                                         required: {value: true, errorMessage: "Please enter your number"},
                                         pattern: {
                                             value: "^\\+998[0-9]{9}$",
                                             errorMessage: "Please enter valida number e.x: +998901234567"
                                         }
                                     }}
                            />
                            <AvField type="password" label="Password"
                                     name="password" placeholder="Password"
                                     validate={{
                                         required: {value: true, errorMessage: "Please enter your password"}
                                     }}
                            />
                            <button type='submit' disabled={loading} className="btn btn-secondary w-100">Tizimga
                                kirish
                            </button>
                        </AvForm>
                    </div>


                </div>
            </div>
        </div>
    </>);
};
export default Home;