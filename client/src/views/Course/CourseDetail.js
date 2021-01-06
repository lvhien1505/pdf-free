import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Divider, Typography, Tag, Space, Button } from "antd";
import {
  EyeOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TagsOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import BaseLayout from "../../components/Layout/BaseLayout";
import { getCourseWithId, getCourseWithCategoryLimit } from "../../api/course";
import CourseElementRelate from "../../components/Course/CourseElementRelate";
import { convertStringToId, convertNameToPath } from "../../utils/convert";
import { notifyScreen } from "../../utils/notify";

const CourseDetail = ({ match }) => {
  const [course, setCourse] = useState({});
  const [coursesRelate, setCoursesRelate] = useState([]);

  const convertId = () => {
    let name = match.params.name;
    let arr = name.split("-");
    let idString = convertStringToId(arr[arr.length - 1]);
    return idString;
  };

  const _getCourseWithCategoryLimit = async (id, limit) => {
    try {
      let res = await getCourseWithCategoryLimit(id, limit);
      if (res.status === 200) {
        setCoursesRelate(res.data);
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

  const _getCourseWithId = async () => {
    try {
      let idCourse = convertId();
      let res = await getCourseWithId(idCourse);
      if (res.status === 200) {
        setCourse(res.data);
        let idCategory = res.data.categories[0]._id;
        let limit = 4;
        _getCourseWithCategoryLimit(idCategory, limit);
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
    _getCourseWithId();
  }, [match.params.name]);

  return (
    <BaseLayout>
      <div className="container-course__detail" style={{ marginTop: "30px" }}>
        {course ? (
          <Row justify="center">
            <Col xl={8} style={{ marginTop: "15px" }}>
              <Row>
                <Col>
                  <Typography.Title
                    level={2}
                    type="secondary"
                    style={{ color: "#727272" }}
                  >
                    {course.code} - {course.name}
                  </Typography.Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Space direction="horizontal">
                    <Typography.Text style={{ color: "#727272" }}>
                      <UserOutlined /> Admin
                    </Typography.Text>
                    <Typography.Text style={{ color: "#727272" }}>
                      <ClockCircleOutlined /> {course.time}{" "}
                    </Typography.Text>
                  </Space>
                </Col>
              </Row>
              <Row justify="center">
                <Col xl={23} style={{ marginTop: "15px" }}>
                  <div
                    style={{
                      backgroundColor: "#87d068",
                      width: "600px",
                      height: "360px",
                      border: "1px solid #808080",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={
                        course.image
                          ? process.env.NODE_ENV === "development"
                            ? `${process.env.REACT_APP_BACKEND_URL}/${course.image}`
                            : `/${course.image}`
                          : null
                      }
                      alt={course.name}
                      height="350px"
                      width="590px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Col>
              </Row>
              <Row justify="center">
                <Col style={{ marginTop: "15px" }} xl={16}>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Typography.Text style={{ color: "#727272" }}>
                      <EyeOutlined /> {course.view}{" "}
                    </Typography.Text>
                    <Typography.Text style={{ color: "#727272" }}>
                      <DownloadOutlined /> {course.download}
                    </Typography.Text>
                    <Typography.Text style={{ color: "#727272" }}>
                      <span ><ThunderboltOutlined /> 1.5GB</span>
                    </Typography.Text>
                  </div>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col>
                  <Typography.Paragraph style={{ whiteSpace: "pre-wrap" }}>
                    {course.description}
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Typography.Text style={{ color: "#727272" }}>
                    Thẻ : {""}
                    {course.tags
                      ? course.tags.map((t, key) => (
                          <Tag color="#87d068" key={key}>
                            <TagsOutlined /> {t.name}
                          </Tag>
                        ))
                      : null}
                  </Typography.Text>
                </Col>
              </Row>
              <Row style={{ marginTop: "30px" }}>
                <Col>
                  <Typography.Title level={4} style={{ color: "#727272" }}>
                    Download :{" "}
                  </Typography.Title>
                  <Button
                    style={{ backgroundColor: "#0c970c", color: "white" }}
                  >
                    <DownloadOutlined />
                    Google Driver{" "}
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xl={1}></Col>
            <Col xs={22} md={15} xl={4}>
              <Divider orientation="left">
                <Typography.Title level={3} style={{ color: "#727272" }}>
                  Khoá học liên quan
                </Typography.Title>
              </Divider>
              {coursesRelate.map((c, key) => {
                let pathStr = convertNameToPath(c.name, c._id);
                return (
                  <Row key={key} justify="center">
                    <Link to={`/course/${pathStr}`}>
                      <Col xl={22}>
                        <CourseElementRelate course={c} />
                      </Col>
                    </Link>
                  </Row>
                );
              })}
            </Col>
          </Row>
        ) : null}
      </div>
    </BaseLayout>
  );
};

export default CourseDetail;
