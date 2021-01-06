import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Menu,Row,Col,Input } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import BaseLayout from "../../components/Layout/BaseLayout";
import BookAdmin from '../../components/Book/BookAdmin';
import CategoryAdmin from '../../components/Category/CategoryAdmin';
import TagAdmin from '../../components/Tag/TagAdmin';
import CourseAdmin from '../../components/Course/CourseAdmin'
import {checkAdmin} from '../../api/auth'
import "./DashBoard.scss"

const DashBoard = ({history}) => {
  const [username,setUsername] =useState("");
  const [showBooks,setShowBooks] =useState(false);
  const [showTags,setShowTags] =useState(false);
  const [showCategories,setShowCategories] =useState(false);
  const [showCourses,setShowCourses] =useState(false);
  
  const _checkAdmin=async ()=>{
    try {
      let res = await checkAdmin();
      if (res.status === 200) {
        setUsername(res.data.username);
        return ;
      }
    } catch (error) {
      if (error) {
        history.push("/")
      }
    }
  }

  const handleClickUpdateBook =()=>{
    setShowCategories(false)
    setShowTags(false)
    setShowCourses(false)
    return setShowBooks(true)
  }

  const handleClickUpdateTag = ()=>{
    setShowCategories(false)
    setShowBooks(false)
    setShowCourses(false)
    return setShowTags(true)
  }
  
  const handleClickUpdateCategory =()=>{
    setShowBooks(false)
    setShowTags(false)
    setShowCourses(false)
    return setShowCategories(true)
  }

  const handleClickUpdateCourse =()=>{
    setShowBooks(false)
    setShowTags(false)
    setShowCategories(false)
    return setShowCourses(true)
  }

  useEffect(() => {
    _checkAdmin();
  }, [])

  return (
    <BaseLayout>
      <div className="line-devide"></div>
      <Row className="container-dashboard">
        <Col span={4}>
          <Menu mode="inline" style={{ width: "256px", minHeight: 400 }}>
            <Menu.Item key="0" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.SubMenu key="10" icon={<SettingOutlined />} title="Manage">
              <Menu.SubMenu title="Books">
                <Menu.Item key="1">Add Book </Menu.Item>
                <Menu.Item key="2" onClick={handleClickUpdateBook}>Update Book </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu title="Tags">
                <Menu.Item key="3">Add Tag </Menu.Item>
                <Menu.Item key="4" onClick={handleClickUpdateTag}>Update Tag </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu title="Categories">
                <Menu.Item key="5">Add Category </Menu.Item>
                <Menu.Item key="6" onClick={handleClickUpdateCategory}>Update Category </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu title="Course">
                <Menu.Item key="7">Add Course </Menu.Item>
                <Menu.Item key="8" onClick={handleClickUpdateCourse}>Update Course </Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.Item key="20" icon={<LoginOutlined />}>
              <Link to="/">Exit</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={18}>
            <Row className="input-search"><Input.Search/></Row>
            <Row>
              {showBooks ? <BookAdmin/> : null}
              {showCategories ? <CategoryAdmin/> :null}
              {showTags ? <TagAdmin/> :null}
              {showCourses ? <CourseAdmin/> :null}
            </Row>
        </Col>
        <Col span={1}>{username}</Col>
      </Row>
    </BaseLayout>
  );
};

export default DashBoard;
