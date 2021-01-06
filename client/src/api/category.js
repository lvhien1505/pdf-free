import axios from 'axios';
import Cookies from "js-cookie";


let token=Cookies.get("__t")
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getAllCategory =async ()=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/category`);
    }else{
       return await axios.post("/category");
    }
}

export const createCategory =async (body)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/category/create`,body,headers);
    }else{
       return await axios.post(`/category/create`,body,headers);
    }
}

export const updateCategory =async (id,body)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/category/${id}`,body,headers);
    }else{
       return await axios.put(`/category/${id}`,body,headers);
    }
}

export const removeCategory =async (id)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/category/${id}`,headers);
    }else{
       return await axios.delete(`/category/${id}`,headers);
    }
}