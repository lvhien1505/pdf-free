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
import { getAllCourse,updateCourse,createCourse,removeCourse} from "../../api/course";
import { getAllCategory } from "../../api/category";
import { notifyScreen } from "../../utils/notify";

const CourseAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [idCourse, setIdCourse] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalBtn, setTotalBtn] = useState([]);
  const [coursesShow, setCoursesShow] = useState([]);
  const [defaultItem, setDefaultItem] = useState([]);
  const [changeRenderItem, setChangeRenderItem] = useState(true);
  const [changeStatus, setChangeStatus] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  //state add book
  const [codeCourse, setCodeCourse] = useState("");
  const [nameCourse, setNameCourse] = useState("");
  const [descriptionCourse, setDescriptionCourse] = useState("");
  const [pathCourse, setPathCourse] = useState("");
  const [tagCourse, setTagCourse] = useState([]);
  const [categoryCourse, setCategoryCourse] = useState([]);
  const [viewCourse, setViewCourse] = useState(0);
  const [downloadCourse, setDownloadCourse] = useState(0);

  const _getListCourse = async () => {
    try {
      let res = await getAllCourse();
      if (res.status === 200) {
        let totalBtnPage = Math.ceil(res.data.length / 8);
        setCourses(res.data);
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

  const pageCourses = (page) => {
    setChangeRenderItem(false);
    let limitCourse = 8;
    let indexValueStart = parseInt((page - 1) * limitCourse);
    let indexValueEnd = parseInt((page - 1) * limitCourse + limitCourse);
    let arr = courses.slice(indexValueStart, indexValueEnd);
    return setCoursesShow(arr);
  };

  const handleBtnAdd = () => {
    return setShowModalAdd(true);
  };

  const handleBtnAddInModal = async () => {
    setChangeStatus(false);
    let body = {
      code:codeCourse,
      name: nameCourse,
      description: descriptionCourse,
      categories: categoryCourse,
      tags: tagCourse,
      path: pathCourse,
      view: viewCourse,
      download: downloadCourse,
    };
    try {
      let res = await createCourse(body);
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
    return setTagCourse(value);
  };

  const handleChangeCategoryInput = (value) => {
    if (value.length > 0) {
      let category = categories.filter((c) => c._id === value[0]); //filter category with id
      if (category) {
        setTags(category[0].tags);
      }
    }
    return setCategoryCourse(value);
  };

  const handleBtnUpdateInModal = async () => {
    setChangeStatus(false);
    let body = {
      code:codeCourse,
      name: nameCourse,
      description: descriptionCourse,
      categories: categoryCourse,
      tags: tagCourse,
      path: pathCourse,
      view: viewCourse,
      download: downloadCourse,
    };
    try {
      let res = await updateCourse(idCourse, body);
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
            <span>*</span> Code
          </div>
          <Input
            allowClear
            placeholder="Nhập code"
            onChange={(e) => setCodeCourse(e.target.value)}
          />
        </Row>
        <Row>
          <div>
            <span>*</span> Name
          </div>
          <Input
            allowClear
            placeholder="Nhập tên"
            onChange={(e) => setNameCourse(e.target.value)}
          />
        </Row>
        <Row>
          <div> Description</div>
          <Input.TextArea
            allowClear
            placeholder="Nhập mô tả"
            onChange={(e) => setDescriptionCourse(e.target.value)}
          />
        </Row>
        <Row>
          <div style={{ width: "100%" }}>
            <span>*</span> Image
          </div>
          <UploadImage typeUrl={"course"}/>
        </Row>
        <Row>
          <div>
            <span>*</span> Path
          </div>
          <Input
            allowClear
            placeholder="Nhập path download"
            onChange={(e) => setPathCourse(e.target.value)}
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
            <span>*</span> View
          </div>
          <Input
            allowClear
            placeholder="Nhập view"
            onChange={(e) => setViewCourse(e.target.value)}
          />
        </Row>
        <Row>
          <div>
            <span>*</span> Download
          </div>
          <Input
            allowClear
            placeholder="Nhập số download"
            onChange={(e) => setDownloadCourse(e.target.value)}
          />
        </Row>
      </>
    );
  };

  const handleBtnUpdate = (id) => {
    setIdCourse(id);
    return setShowModalUpdate(true);
  };

  const handleBtnDelete = async (id) => {
    setChangeStatus(false);
    try {
      let res = await removeCourse(id);
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
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
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
      title: "Time",
      dataIndex: "time",
      key: "time",
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
    _getListCourse();
    _getListCategory();
  }, [changeStatus]);

  return (
    <div style={{ width: "100%" }}>
      <Row span={24}>
        <Col>
          <Button type="primary" onClick={handleBtnAdd}>
            Add Course
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={changeRenderItem ? defaultItem : coursesShow}
        pagination={false}
      />
      <Modal
        visible={showModalAdd}
        onCancel={() => setShowModalAdd(false)}
        title="Add Course"
        okText="Add"
        onOk={handleBtnAddInModal}
      >
        {containerModal()}
      </Modal>
      <Modal
        visible={showModalUpdate}
        onCancel={() => setShowModalUpdate(false)}
        title="Update Course"
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
            onChange={pageCourses}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CourseAdmin;
