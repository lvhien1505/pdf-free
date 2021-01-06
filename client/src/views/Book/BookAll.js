import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Pagination } from "antd";
import {UnorderedListOutlined,CaretRightOutlined} from "@ant-design/icons";
import BaseLayout from "../../components/Layout/BaseLayout";
import BookElement from "../../components/Book/BookElement";
import MenuCategory from "../../components/Menu/MenuCategory";
import { getAllBooks } from "../../api/book";
import { notifyScreen } from "../../utils/notify";
import { convertNameToPath } from "../../utils/convert";

const BookAll = () => {
  const [books, setBooks] = useState([]);
  const [totalBtn, setTotalBtn] = useState([]);
  const [booksShow, setBooksShow] = useState([]);

  const _getListBook = async () => {
    try {
      let res = await getAllBooks();
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

  const pageBooks = (page) => {
    let limitBook = 8;
    let indexValueStart = parseInt((page - 1) * limitBook);
    let indexValueEnd = parseInt((page - 1) * limitBook + limitBook);
    let arr = books.slice(indexValueStart, indexValueEnd);
    return setBooksShow(arr);
  };

  useEffect(() => {
    _getListBook();
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
            <Row style={{marginLeft:"20px"}}>
              <Col>
                <h2>Tất cả thể loại</h2>
                <h4><UnorderedListOutlined/> Tất cả thể loại <CaretRightOutlined/> </h4>
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

export default BookAll;
