import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Divider, Typography, Tag, Space, Button } from "antd";
import {
  EyeOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TagsOutlined
} from "@ant-design/icons";
import BaseLayout from "../../components/Layout/BaseLayout";
import BookElement from "../../components/Book/BookElement";
import { getBookWithId, getBookWithCategoryLimit } from "../../api/book";
import { convertStringToId, convertNameToPath } from "../../utils/convert";
import { notifyScreen } from "../../utils/notify";

const BookDetail = ({ match }) => {
  const [book, setBook] = useState({});
  const [booksRelate, setBooksRelate] = useState([]);

  const convertId = () => {
    let name = match.params.name;
    let arr = name.split("-");
    let idString = convertStringToId(arr[arr.length - 1]);
    return idString;
  };

  const _getBookWithCategoryLimit = async (id, limit) => {
    try {
      let res = await getBookWithCategoryLimit(id, limit);
      if (res.status === 200) {
        setBooksRelate(res.data);
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

  const _getBookWithId = async () => {
    try {
      let idBook = convertId();
      let res = await getBookWithId(idBook);
      if (res.status === 200) {
        setBook(res.data);
        let idCategory = res.data.categories[0]._id;
        let limit = 6;
        _getBookWithCategoryLimit(idCategory, limit);
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
    _getBookWithId();
  }, [match.params.name]);

  return (
    <BaseLayout>
      <div className="container-book__detail" style={{ marginTop: "30px" }}>
        {book ? (
          <Row justify="center">
            <Col xs={17} xl={4} md={7}>
              <div
                style={{
                  width: "260px",
                  height: "360px",
                  border: "1px solid #808080",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={
                    book.image
                      ? process.env.NODE_ENV === "development"
                        ? `${process.env.REACT_APP_BACKEND_URL}/${book.image}`
                        : `/${book.image}`
                      : null
                  }
                  alt={book.name}
                  height="350px"
                  width="250px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Col>
            <Col  xs={16} md={8} xl={9}>
              <Row>
                  <Typography.Title
                    level={2}
                    type="secondary"
                    style={{ color: "#727272" }}
                  >
                    {book.name}
                  </Typography.Title>
              </Row>
              <Row>
                <Col xs={13} xl={12}>
                  <Space direction="vertical">
                    <Typography.Text style={{ color: "#727272" }}>
                      Tác giả : {""}
                      <span style={{ color: "#597acd" }}>
                        {book.author}
                      </span>{" "}
                    </Typography.Text>
                    <Typography.Text style={{ color: "#727272" }}>
                      Thẻ : {""}
                      {book.tags
                        ? book.tags.map((t, key) => (
                            <Tag color="#87d068" key={key}>
                              <TagsOutlined/> {t.name}
                            </Tag>
                          ))
                        : null}
                    </Typography.Text>
                    <Typography.Text style={{ color: "#727272" }}>
                      Thể loại : {""}
                      {book.categories
                        ? book.categories.map((c, key) => (
                            <Tag color="#b89bac" key={key}>
                              {c.name}
                            </Tag>
                          ))
                        : null}
                    </Typography.Text>
                    <Typography.Text style={{ color: "#727272" }}>
                      Số trang : {""}
                      <span style={{ color: "#597acd" }}>
                        {book.pageNumber}
                      </span>
                    </Typography.Text>
                    <Typography.Text style={{ color: "#727272" }}>
                      Kích thước : {""}
                      <span style={{ color: "#597acd" }}>1.5MB</span>
                    </Typography.Text>
                  </Space>
                </Col>
                <Col xs={12} xl={10} >
                  <Space direction="vertical">
                    <Typography.Text style={{ color: "#727272" }}>
                      <EyeOutlined /> {book.view}{" "}
                    </Typography.Text>
                    <Typography.Text style={{ color: "#727272" }}>
                      <DownloadOutlined /> {book.download}
                    </Typography.Text>
                    <Typography.Text style={{ color: "#727272" }}>
                      <ClockCircleOutlined /> {book.time}{" "}
                    </Typography.Text>
                    <Typography.Text style={{ color: "#727272" }}>
                      <UserOutlined /> Admin
                    </Typography.Text>
                  </Space>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col xl={24}>
                  <Typography.Paragraph style={{ whiteSpace: "pre-wrap" }}>
                    {book.description}
                  </Typography.Paragraph>
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
                    <DownloadOutlined /> PDF{" "}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : null}
        <Row justify="center">
          <Col xs={22} md={15} xl={14}>
            <Divider orientation="left">
              <Typography.Title level={3} style={{ color: "#727272" }}>
                Cùng thể loại
              </Typography.Title>
            </Divider>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={22} md={15} xl={14}>
            <Row justify="center">
              {booksRelate.map((b, key) => {
                let pathStr = convertNameToPath(b.name, b._id);
                return (
                  <Col
                    xs={12}
                    xl={4}
                    md={6}
                    key={key}
                    style={{ marginBottom: "20px" }}
                  >
                    <Link
                      to={`/book/${pathStr}`}                   
                    >
                      <BookElement book={b} />
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

export default BookDetail;
