import React from "react";
import {Card,Image} from 'antd';
import { EyeOutlined, DownloadOutlined,UserOutlined} from "@ant-design/icons";

const CourseElementRelate = ({course}) => {
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
            height="150px"
            width="280px"
            style={{ objectFit: "cover" }}
          />
      }
      size="small"
      style={{
        width: "280px",
        border:"hidden",
        height:"250px"
      }}
    >
      <div
      >
        <h3 style={{color:"#727272",fontWeight:"600"}}>{course.code} - {course.name}</h3>
        <div style={{marginTop:"-6px",fontSize:"12px",color:"#808080"}}>
        <span>
          <EyeOutlined /> {course.view}
        </span>
        <span style={{ marginLeft: "15px" }}>
          <DownloadOutlined /> {course.download}
        </span>
        </div>
      </div>
    </Card>
  );
};

export default CourseElementRelate;
