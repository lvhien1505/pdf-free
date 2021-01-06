import React from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import { Form, Input, Button } from "antd";
import {login} from '../../api/login'
import {notifyScreen} from '../../utils/notify'
import './Login.scss'

const Login = ({history}) => {
 
  const onFinish=async (values)=>{
      let username=values.username;
      let password=values.password;
      try {
        const res=await login(username,password);
        if (res.data.statusCode===200) {
          notifyScreen("success","Thành công",res.data.message);
          history.push("/dashboard")
        }
      } catch (error) {
        if (error.response.data.statusCode) {
          return notifyScreen("error",error.response.data.statusCode,error.response.data.message)
        }
        notifyScreen("error","500","Lỗi không xác định")
      }

  }

  return (
    <BaseLayout>
      <div className="form-login">
        <div className="title-form">
           <h2>Đăng nhập</h2>
        </div>
        <Form onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-login">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </BaseLayout>
  );
};

export default Login;
