export function setCookie(cname, cvalue, maxAge) {
    const d = new Date();
    d.setTime(d.getTime() + (maxAge*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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

export async function checkTokenServerSide(ctx) {
    if(ctx.req){
        const req=await fetch(process.env.SERVER_URL+"client/me", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+ctx.req.cookies["token"]??"",
                "Accept": "application/json"
            }
        })
        const res=await req.json()
        if(req.status===200){
            return {
                props: {
                    user: res.data
                },
                success: true

            }
        }
        ctx.res.writeHead(302, { Location: '/' }).end()
    }
    return {success: false}
}