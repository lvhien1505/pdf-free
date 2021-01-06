import React from "react";
import {Card,Image} from 'antd';
import { EyeOutlined, DownloadOutlined,UserOutlined,ThunderboltOutlined} from "@ant-design/icons";

const CourseElement = ({course}) => {
  return (
    <Card
      cover={ 
          <Image
            src={
              process.env.NODE_ENV === "development"
                ? `${process.env.REACT_APP_BACKEND_URL}/${course.image}`
                : `/${course.image}`
            }
            alt={course.name}
            height="200px"
            width="350px"
            style={{ objectFit: "cover" }}
          />
      }
      size="small"
      style={{
        width: "350px",
        border:"hidden",
        height:"400px"
      }}
    >
      <div
      >
        <h3 style={{color:"#597acd",fontWeight:"600"}}>{course.code} - {course.name}</h3>
        <p style={{ whiteSpace: "pre-wrap",color:"#808080" }}>{course.description}</p>
        <div style={{marginTop:"-6px",fontSize:"12px",color:"#808080"}}>
        <span>
          <EyeOutlined /> {course.view}
        </span>
        <span style={{ marginLeft: "12px" }}>
          <DownloadOutlined /> {course.download}
        </span>
        <span style={{ marginLeft: "12px" }}><ThunderboltOutlined /> 1.5GB</span>
        </div>
        <div style={{marginTop:"5px",color:"#808080"}}>
            <span>Updated : {course.time}</span>
            <span style={{ marginLeft: "12px" }}><UserOutlined/> by Admin</span>
        </div>
      </div>
    </Card>
  );
};

export default CourseElement;
