const SendData = (res,data,status)=>{
    res.status(status ? status : 200).json(data);
}
// send cookie data
export const SendCookieData = (res,data,cookieName,cookieValue,cookieOptions)=>{
    res.cookie(cookieName,cookieValue,cookieOptions).status(200).json(data);
}

export default SendData;