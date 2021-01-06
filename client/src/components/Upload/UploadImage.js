import React, { useState, useEffect } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined} from "@ant-design/icons";
import Cookies from 'js-cookie'

const UploadImage = ({typeUrl}) => {
  const [listImage, setListImage] = useState([]);
  const [disabledUpload, setDisabledUpload] = useState(true);
  let token=Cookies.get("__t")
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    setListImage(info.fileList);
    return;
  };

  useEffect(() => {
    if (listImage.length < 1) {
      return setDisabledUpload(false);
    }
    if (listImage.length === 1) {  
      return setDisabledUpload(true);
    }
  }, [listImage.length]);

  return (
    <div>
      <Upload
        action={`${
          process.env.NODE_ENV !== "production"
            ? process.env.REACT_APP_BACKEND_URL
            : ""
        }/${typeUrl}/upload/image`}
        headers={headers}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <Button
          style={{ marginTop: "5px" }}
          disabled={disabledUpload}
          icon={<UploadOutlined />}
        ></Button>
        <span style={{ marginLeft: "5px" }}>Chọn ảnh</span>
      </Upload>
    </div>
  );
};

export default UploadImage;

