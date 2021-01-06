import React from 'react';
import {SettingOutlined} from "@ant-design/icons";
import BaseLayout from '../../components/Layout/BaseLayout';


const ErrorPage = () => {
    return (
        <BaseLayout>
         <div style={{width:"200px", margin:"0 auto" ,marginTop:"25vh",textAlign:"center"}}>
          <h1 style={{color:"#808080",fontSize:"60px"}}><SettingOutlined /></h1>
          <h2 style={{color:"#808080"}}>This page not found !</h2>
         </div>
        </BaseLayout>
    )
}

export default ErrorPage
