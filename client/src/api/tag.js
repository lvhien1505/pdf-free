import axios from 'axios';
import Cookies from "js-cookie";


let token=Cookies.get("__t")
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getAllTag =async ()=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tag`);
    }else{
       return await axios.post("/tag");
    }
}

export const createTag =async (name)=>{
    let body={name:name}
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tag/create`,body,headers);
    }else{
       return await axios.post(`/tag/create`,body,headers);
    }
}

export const updateTag=async (id,name)=>{
    let body={name:name}
    if (process.env.NODE_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tag/${id}`,body,headers);
    }else{
       return await axios.put(`/tag/${id}`,body,headers);
    }
}

export const removeTag =async (id)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tag/${id}`,headers);
    }else{
       return await axios.delete(`/tag/${id}`,headers);
    }
}