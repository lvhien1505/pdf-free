import axios from 'axios';
import Cookies from 'js-cookie'

let token=Cookies.get("__t");
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getAllBooks =async ()=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/show`);
    }else{
       return await axios.post("/book/show");
    }
}

export const getBooksUpdate =async ()=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/show/update`);
    }else{
       return await axios.post("/book/show/update");
    }
}

export const getBooksView =async ()=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/show/view`);
    }else{
       return await axios.post("/book/show/view");
    }
}

export const getBooksDownload =async ()=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/show/download`);
    }else{
       return await axios.post("/book/show/download");
    }
}

export const getBookWithId =async (id)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/${id}`);
    }else{
       return await axios.post(`/book/${id}`);
    }
}

export const getBookWithCategoryLimit =async (id,limit)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/category/${id}/?limit=${limit}`);
    }else{
       return await axios.post(`/book/category/${id}/?limit=${limit}`);
    }
}

export const getBookWithTag =async (id)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/category/tag/${id}`);
    }else{
       return await axios.post(`/book/category/tag/${id}/?`);
    }
}

export const addBook =async (body)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/create`,body,headers);
    }else{
       return await axios.post("/book/create",body,headers);
    }
}

export const updateBook =async (id,body)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/book/${id}`,body,headers);
    }else{
       return await axios.put(`/book/${id}`,body,headers);
    }
}

export const deleteBook =async (id)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/book/${id}`,headers);
    }else{
       return await axios.delete(`/book/${id}`,headers);
    }
}