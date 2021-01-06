import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Pagination } from "antd";
import { UnorderedListOutlined, CaretRightOutlined } from "@ant-design/icons";
import BaseLayout from "../../components/Layout/BaseLayout";
import BookElement from "../../components/Book/BookElement";
import MenuCategory from "../../components/Menu/MenuCategory";
import { getBookWithTag } from "../../api/book";
import { getAllTag } from "../../api/tag";
import { notifyScreen } from "../../utils/notify";
import { convertNameToPath, convertStringNameTag } from "../../utils/convert";

const BookWithTag = ({ match }) => {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState(false);
  const [tags, setTags] = useState([]);
  const [nameTag, setNameTag] = useState("");
  const [idTag, setIdTag] = useState("");
  const [totalBtn, setTotalBtn] = useState([]);
  const [booksShow, setBooksShow] = useState([]);

  const _getListBookWithTag = async (id) => {
    try {
      let res = await getBookWithTag(id);
      if (res.status === 200) {
        let totalBtnPage = Math.ceil(res.data.length / 8);
        setBooks(res.data);
        setBooksShow(res.data.slice(0, 8));
        setTotalBtn(totalBtnPage);
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

  const _getListTag = async () => {
    try {
      let res = await getAllTag();
      if (res.status === 200) {
        setTags(res.data);
        return setStatus(true);
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

  const compareNameTag = (nameTag, data) => {
    if (data.length > 0) {
      data.forEach((e) => {
        let convertStr = convertStringNameTag(e.name);
        if (convertStr === nameTag) {
          setNameTag(e.name)
          return setIdTag(e._id);
        }
      });
    }
    return;
  };

  const pageBooks = (page) => {
    let limitBook = 8;
    let indexValueStart = parseInt((page - 1) * limitBook);
    let indexValueEnd = parseInt((page - 1) * limitBook + limitBook);
    let arr = books.slice(indexValueStart, indexValueEnd);
    return setBooksShow(arr);
  };

  useEffect(() => {
    _getListTag();
    if (tags.length > 0) {
      compareNameTag(match.params.nameTag, tags);
    }
    if (idTag) {
      _getListBookWithTag(idTag);
    }
  }, [status, idTag, match.params.nameTag]);

  return (
    <BaseLayout>
      <div>
        <Row justify="center">
          <Col xs={16} md={5} xl={4}>
            <MenuCategory />
          </Col>
          <Col md={1}></Col>
          <Col xs={23} md={14} xl={11}>
            <Row style={{ marginLeft: "20px" }}>
              <Col>
                <h2>{nameTag ? nameTag :null}</h2>
                <h4>
                  <UnorderedListOutlined /> Tất cả thể loại{" "}
                  <CaretRightOutlined />{match.params.nameTag}
                </h4>
              </Col>
            </Row>
            <Row justify="space-around">
              {booksShow.map((b, key) => {
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
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Pagination
              defaultCurrent={1}
              total={totalBtn * 10 || 10}
              onChange={pageBooks ? pageBooks : null}
            />
          </Col>
        </Row>
      </div>
    </BaseLayout>
  );
};

export default BookWithTag;
