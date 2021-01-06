import React from "react";
import { Input, Row, Col,Menu,Dropdown } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import logo from "../../logo/pdf-free.top.png";
import "./Header.scss";

const Header = () => {
  const menu=()=>{
     return (
     <Menu >
     <Menu.Item key="1"><Link to="/ebooks/category"><p>EBOOKS</p></Link></Menu.Item>
     <Menu.Item key="2"><Link to="/courses"><p>COURSES</p></Link></Menu.Item>
     <Menu.Item key="3"><Link to="/courses"><p>COUPON</p></Link></Menu.Item>
     <Menu.Item key="4"><Link to="/courses"><p>DOMAIN</p></Link></Menu.Item>
     </Menu>
    )
  }
  
  return (
    <Row className="header" justify="center">
      <Col xs={10} md={5} xl={3} className="left-header" >
        <Link to="/">
          <img className="logo" src={logo} alt="pdf-free.top" />
        </Link>
      </Col>
      <Col xs={9} md={5} xl={8} className="center-header">
        <Input.Search
          size="large"
          placeholder="Nhập tên ebook hoặc khóa học..."
          enterButton
        />
      </Col>
      <Col xs={0} md={8} xl={5} className="right-header">
        <Row className="right-header__row">
          <Col span={6} className="right-header__row-item"><Link to="/ebooks/category"><p>EBOOK</p></Link></Col>
          <Col span={6} className="right-header__row-item"><Link to="/courses"><p>COURSE</p></Link></Col>
          <Col span={6} className="right-header__row-item"><Link to="/courses"><p>COUPON</p></Link></Col>
        </Row>
      </Col>
      <Col xs={4} md={0} xl={0} lg={0} className="right-header-dropdown"> 
          <Dropdown
            overlay={menu}
            trigger={["click"]}
          >
             <MenuOutlined style={{color:"#0c970c"}}/>
          </Dropdown>
      </Col>
    </Row>
  );
};

export default Header;
