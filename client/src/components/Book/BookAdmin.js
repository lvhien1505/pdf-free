import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Pagination,
  Table,
  Modal,
  Input,
  Select,
  Tag,
  Image,
} from "antd";
import UploadImage from "../Upload/UploadImage";
import { getAllBooks, addBook, updateBook, deleteBook } from "../../api/book";
import { getAllCategory } from "../../api/category";
import { notifyScreen } from "../../utils/notify";

const BookAdmin = () => {
  const [books, setBooks] = useState([]);
  const [idBook, setIdBook] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalBtn, setTotalBtn] = useState([]);
  const [booksShow, setBooksShow] = useState([]);
  const [defaultItem, setDefaultItem] = useState([]);
  const [changeRenderItem, setChangeRenderItem] = useState(true);
  const [changeStatus, setChangeStatus] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  //state add book
  const [nameBook, setNameBook] = useState("");
  const [descriptionBook, setDescriptionBook] = useState("");
  const [authorBook, setAuthorBook] = useState("");
  const [pathBook, setPathBook] = useState("");
  const [tagBook, setTagBook] = useState([]);
  const [categoryBook, setCategoryBook] = useState([]);
  const [pageNumberBook, setPageNumberBook] = useState(0);
  const [viewBook, setViewBook] = useState(0);
  const [downloadBook, setDownloadBook] = useState(0);

  const _getListBook = async () => {
    try {
      let res = await getAllBooks();
      if (res.status === 200) {
        let totalBtnPage = Math.ceil(res.data.length / 8);
        setBooks(res.data);
        setDefaultItem(res.data.slice(0, 8));
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

  const _getListCategory = async () => {
    try {
      let res = await getAllCategory();
      if (res.status === 200) {
        setCategories(res.data);
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
    setChangeRenderItem(false);
    let limitBook = 8;
    let indexValueStart = parseInt((page - 1) * limitBook);
    let indexValueEnd = parseInt((page - 1) * limitBook + limitBook);
    let arr = books.slice(indexValueStart, indexValueEnd);
    return setBooksShow(arr);
  };

  const handleBtnAdd = () => {
    return setShowModalAdd(true);
  };

  const handleBtnAddInModal = async () => {
    setChangeStatus(false);
    let body = {
      name: nameBook,
      description: descriptionBook,
      author: authorBook,
      categories: categoryBook,
      tags: tagBook,
      path: pathBook,
      pageNumber: pageNumberBook,
      view: viewBook,
      download: downloadBook,
    };
    try {
      let res = await addBook(body);
      if (res.status === 200) {
        notifyScreen("success", res.data.statusCode, res.data.message);
        setShowModalAdd(false);
        return setChangeStatus(true);
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

  const handleChangeTagInput = (value) => {
    return setTagBook(value);
  };

  const handleChangeCategoryInput = (value) => {
    if (value.length > 0) {
      let category = categories.filter((c) => c._id === value[0]); //filter category with id
      if (category) {
        setTags(category[0].tags);
      }
    }
    return setCategoryBook(value);
  };

  const handleBtnUpdateInModal = async () => {
    setChangeStatus(false);
    let body = {
      name: nameBook,
      description: descriptionBook,
      author: authorBook,
      categories: categoryBook,
      tags: tagBook,
      path: pathBook,
      pageNumber: pageNumberBook,
      view: viewBook,
      download: downloadBook,
    };
    try {
      let res = await updateBook(idBook, body);
      if (res.status === 200) {
        notifyScreen("success", res.data.statusCode, res.data.message);
        setShowModalUpdate(false);
        return setChangeStatus(true);
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

  const containerModal = () => {
    return (
      <>
        <Row>
          <div>
            <span>*</span> Name
          </div>
          <Input
            allowClear
            placeholder="Nhập tên"
            onChange={(e) => setNameBook(e.target.value)}
          />
        </Row>
        <Row>
          <div> Description</div>
          <Input.TextArea
            allowClear
            placeholder="Nhập mô tả"
            onChange={(e) => setDescriptionBook(e.target.value)}
          />
        </Row>
        <Row>
          <div>
            <span>*</span> Author
          </div>
          <Input
            allowClear
            placeholder="Nhập tên tác giả"
            onChange={(e) => setAuthorBook(e.target.value)}
          />
        </Row>
        <Row>
          <div style={{ width: "100%" }}>
            <span>*</span> Image
          </div>
          <UploadImage typeUrl={"book"}/>
        </Row>
        <Row>
          <div>
            <span>*</span> Path
          </div>
          <Input
            allowClear
            placeholder="Nhập path download"
            onChange={(e) => setPathBook(e.target.value)}
          />
        </Row>
        <Row>
          <div>
            <span>*</span> Category
          </div>
          <Select
            allowClear
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn"
            onChange={handleChangeCategoryInput}
          >
            {categories.map((c, key) => (
              <Select.Option key={key} label={c.name} value={c._id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Row>
        <Row>
          <div>
            <span>*</span> Tag
          </div>
          <Select
            allowClear
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn"
            onChange={handleChangeTagInput}
          >
            {tags
              ? tags.map((t, key) => (
                  <Select.Option key={key} label={t.name} value={t._id}>
                    {t.name}
                  </Select.Option>
                ))
              : null}
          </Select>
        </Row>
        <Row>
          <div>
            <span>*</span> Page Number
          </div>
          <Input
            allowClear
            type="number"
            placeholder="Nhập số trang"
            onChange={(e) => setPageNumberBook(e.target.value)}
          />
        </Row>
        <Row>
          <div>
            <span>*</span> View
          </div>
          <Input
            allowClear
            placeholder="Nhập view"
            onChange={(e) => setViewBook(e.target.value)}
          />
        </Row>
        <Row>
          <div>
            <span>*</span> Download
          </div>
          <Input
            allowClear
            placeholder="Nhập số download"
            onChange={(e) => setDownloadBook(e.target.value)}
          />
        </Row>
      </>
    );
  };

  const handleBtnUpdate = (id) => {
    setIdBook(id);
    return setShowModalUpdate(true);
  };

  const handleBtnDelete = async (id) => {
    setChangeStatus(false);
    try {
      let res = await deleteBook(id);
      if (res.status === 200) {
        notifyScreen("success", res.data.statusCode, res.data.message);
        return setChangeStatus(true);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 400,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return process.env.NODE_ENV === "development" ? (
          <Image
            width="60px"
            height="75px"
            style={{ objectFit: "cover" }}
            src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
          />
        ) : (
          <Image src={`/${image}`} />
        );
      },
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      render: (categories) => (
        <>
          {categories.map((c, key) => (
            <span key={key}>
              <Tag color="#ff4d4f">{c.name}</Tag>
            </span>
          ))}
        </>
      ),
    },
    {
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags.map((t, key) => (
            <span key={key}>
              <Tag color="#87d068">{t.name}</Tag>
            </span>
          ))}
        </>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Page Number",
      dataIndex: "pageNumber",
      key: "pageNumber",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "Download",
      dataIndex: "download",
      key: "download",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (id) => (
        <>
          <Button
            type="primary"
            style={{ width: "80px" }}
            onClick={() => handleBtnUpdate(id)}
          >
            Update
          </Button>
          <Button
            type="danger"
            style={{ width: "80px" }}
            onClick={() => handleBtnDelete(id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    _getListBook();
    _getListCategory();
  }, [changeStatus]);

  return (
    <div style={{ width: "100%" }}>
      <Row span={24}>
        <Col>
          <Button type="primary" onClick={handleBtnAdd}>
            Add Book
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={changeRenderItem ? defaultItem : booksShow}
        pagination={false}
      />
      <Modal
        visible={showModalAdd}
        onCancel={() => setShowModalAdd(false)}
        title="Add Book"
        okText="Add"
        onOk={handleBtnAddInModal}
      >
        {containerModal()}
      </Modal>
      <Modal
        visible={showModalUpdate}
        onCancel={() => setShowModalUpdate(false)}
        title="Update Book"
        okText="Update"
        onOk={handleBtnUpdateInModal}
      >
        {containerModal()}
      </Modal>
      <Row justify="center">
        <Col>
          <Pagination
            defaultCurrent={1}
            total={totalBtn * 10 || 10}
            onChange={pageBooks}
          />
        </Col>
      </Row>
    </div>
  );
};

export default BookAdmin;
