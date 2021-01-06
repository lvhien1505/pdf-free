import React from "react";
import {Card,Image} from 'antd';
import { EyeOutlined, DownloadOutlined,UserOutlined} from "@ant-design/icons";

const BookElement = ({book}) => {
  return (
    <Card
      cover={ 
          <Image
            src={
              process.env.NODE_ENV === "development"
                ? `${process.env.REACT_APP_BACKEND_URL}/${book.image}`
                : `/${book.image}`
            }
            alt={book.name}
            height="200px"
            width="140px"
            style={{ objectFit: "cover" }}
          />
      }
      size="small"
      style={{
        width: "140px",
        border:"hidden",
        height:"400px"
      }}
    >
      <div
      >
        <h4 style={{color:"#597acd",fontWeight:"600"}}>{book.name}</h4>
        <p style={{color:"#808080",marginTop:"-5px", fontSize: "11px"}}>{book.author}</p>
        <div style={{marginTop:"-6px",fontSize:"12px",color:"#808080"}}>
        <span>
          <EyeOutlined /> {book.view}
        </span>
        <span style={{ marginLeft: "10px" }}>
          <DownloadOutlined /> {book.download}
        </span>
       
        </div>
        <div style={{marginTop:"5px",color:"#808080"}}>
            <span ><UserOutlined/> by Admin</span>
        </div>
      </div>
    </Card>
  );
};

export default BookElement;
