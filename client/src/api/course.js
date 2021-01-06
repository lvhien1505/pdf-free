import axios from 'axios';
import Cookies from "js-cookie";


let token=Cookies.get("__t")
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getAllCourse =async ()=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/course/show`);
    }else{
       return await axios.post("/course/show");
    }
}

export const getCourseUpdate =async ()=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/course/show/update`);
    }else{
       return await axios.post("/course/show/update");
    }
}

export const getCourseWithId =async (id)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/course/${id}`);
    }else{
       return await axios.post(`/course/${id}`);
    }
}

export const getCourseWithCategoryLimit =async (id,limit)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/course/category/${id}/?limit=${limit}`);
    }else{
       return await axios.post(`/course/category/${id}/?limit=${limit}`);
    }
}

export const createCourse =async (body)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/course/create`,body,headers);
    }else{
       return await axios.post(`/course/create`,body,headers);
    }
}

export const updateCourse =async (id,body)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/course/${id}`,body,headers);
    }else{
       return await axios.put(`/course/${id}`,body,headers);
    }
}

export const removeCourse =async (id)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/course/${id}`,headers);
    }else{
       return await axios.delete(`/course/${id}`,headers);
    }
}