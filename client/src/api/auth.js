import axios from 'axios';
import Cookies from 'js-cookie'

let token=Cookies.get("__t");
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const checkAdmin =async ()=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-auth`,{},headers);
    }else{
       return await axios.post(`/check-auth`,{},headers);
    }
}