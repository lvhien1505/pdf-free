import axios from 'axios';

export const login =async (username,password)=>{
    let body ={
        username,password
    }
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,body,{withCredentials:true});
    }else{
       return await axios.post("/login",body,{withCredentials:true});
    }
  
}

