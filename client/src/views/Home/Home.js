import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, Row, Col, Divider } from "antd";
import BaseLayout from "../../components/Layout/BaseLayout";
import BookElement from "../../components/Book/BookElement";
import CourseElement from "../../components/Course/CourseElement";
import MenuCategory from "../../components/Menu/MenuCategory";
import { getBooksUpdate, getBooksView, getBooksDownload } from "../../api/book";
import { getCourseUpdate } from "../../api/course";
import { notifyScreen } from "../../utils/notify";
import { convertNameToPath } from "../../utils/convert";

const Home = () => {
  const [listBookNew, setListBookNew] = useState([]);
  const [listBookView, setListBookView] = useState([]);
  const [listBookDownload, setListBookDownload] = useState([]);
  const [listCourse, setListCourse] = useState([]);

  const _getListBookNew = async () => {
    try {
      let res = await getBooksUpdate();
      if (res.status === 200) {
        setListBookNew(res.data);
        return;
      }
    } catch (error) {
      if (error.response.data.statusCode) {
        return notifyScreen(
          "error",
          error.response.data.statusCode,
          error.response.data.message
        );
      }
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const _getListBookView = async () => {
    try {
      let res = await getBooksView();
      if (res.status === 200) {
        setListBookView(res.data);
        return;
      }
    } catch (error) {
      if (error.response.data.statusCode) {
        return notifyScreen(
          "error",
          error.response.data.statusCode,
          error.response.data.message
        );
      }
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const _getListBookDownload = async () => {
    try {
      let res = await getBooksDownload();
      if (res.status === 200) {
        setListBookDownload(res.data);
        return;
      }
    } catch (error) {
      if (error.response.data.statusCode) {
        return notifyScreen(
          "error",
          error.response.data.statusCode,
          error.response.data.message
        );
      }
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const _getListCourse = async () => {
    try {
      let res = await getCourseUpdate();
      if (res.status === 200) {
        setListCourse(res.data);
        return;
      }
    } catch (error) {
      if (error.response.data.statusCode) {
        return notifyScreen(
          "error",
          error.response.data.statusCode,
          error.response.data.message
        );
      }
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  useEffect(() => {
    _getListBookNew();
    _getListBookView();
    _getListBookDownload();
    _getListCourse();
  }, []);

  return (
    <BaseLayout>
      <div>
        <Row justify="center">
          <Col xs={16} md={5} xl={4}>
            <MenuCategory />
          </Col>
          <Col md={1}></Col>
          <Col xs={23} md={14} xl={11}>
            <Tabs defaultActiveKey="1" size="large">
              <Tabs.TabPane tab="Ebook mới" key="1">
                <Row justify="space-around">
                  {listBookNew.map((b, key) => {
                    let pathStr = convertNameToPath(b.name, b._id);
                    return (
                      <Col
                        xs={12}
                        xl={5}
                        md={8}
                        key={key}
                        style={{ marginBottom: "20px" }}
                      >
                        <Link
                          to={{
                            pathname: `/book/${pathStr}`,
                          }}
                        >
                          <BookElement book={b} />
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Xem nhiều" key="2">
                <Row justify="space-around">
                  {listBookView.map((b, key) => {
                    let pathStr = convertNameToPath(b.name, b._id);
                    return (
                      <Col
                        xs={12}
                        xl={5}
                        md={8}
                        key={key}
                        style={{ marginBottom: "20px" }}
                      >
                        <Link
                          to={{
                            pathname: `/book/${pathStr}`,
                          }}
                        >
                          <BookElement book={b} />
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Tải nhiều" key="3">
                <Row justify="space-around">
                  {listBookDownload.map((b, key) => {
                    let pathStr = convertNameToPath(b.name, b._id);
                    return (
                      <Col
                        xs={9}
                        xl={5}
                        md={7}
                        key={key}
                        style={{ marginBottom: "20px" }}
                      >
                        <Link
                          to={{
                            pathname: `/book/${pathStr}`,
                          }}
                        >
                          <BookElement book={b} />
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        <Row justify="center">
          <Col md={19} xl={16}>
            <Divider orientation="left" style={{ fontSize: "21px" }}>
              Khóa học mới cập nhật
            </Divider>
          </Col>
        </Row>
        <Row justify="center">
          <Col xl={16} md={19} xs={23}>
            <Row justify="space-between">
              {listCourse.map((c, key) => {
                let pathStr = convertNameToPath(c.name, c._id);
                return (
                  <Col
                    xs={13}
                    xl={7}
                    md={11}
                    key={key}
                    style={{ marginBottom: "20px" }}
                  >
                    <Link
                      to={{
                        pathname: `/course/${pathStr}`,
                      }}
                    >
                      <CourseElement course={c} />
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </BaseLayout>
  );
};

export default Home;
