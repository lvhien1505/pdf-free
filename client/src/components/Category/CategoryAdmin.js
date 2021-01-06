import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Modal, Input, Select,Tag } from "antd";
import {
  getAllCategory,
  createCategory,
  updateCategory,
  removeCategory,
} from "../../api/category";
import { getAllTag } from "../../api/tag";
import { notifyScreen } from "../../utils/notify";

const CategoryAdmin = () => {
  const [nameUpdateCategory, setNameUpdateCategory] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsUpdate, setTagsUpdate] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(false);

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

  const _getListTag = async () => {
    try {
      let res = await getAllTag();
      if (res.status === 200) {
        setTags(res.data);
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

  const handleBtnAdd = () => {
    return setShowModalAdd(true);
  };

  const handleBtnAddInModal = async () => {
    setStatusUpdate(false);
    let body = {
      name: nameUpdateCategory,
      tags: tagsUpdate,
    };
    try {
      let res = await createCategory(body);
      if (res.data.statusCode === 200) {
        notifyScreen("success", "Thành công", res.data.message);
        setShowModalAdd(false);
        return setStatusUpdate(true);
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

  const handleBtnUpdate = (id) => {
    setIdCategory(id);
    setShowModalUpdate(true);
    return;
  };

  const handleBtnUpdateInModal = async () => {
    setStatusUpdate(false);
    let body = {
      name: nameUpdateCategory,
      tags: tagsUpdate,
    };
    try {
      let res = await updateCategory(idCategory, body);
      if (res.data.statusCode === 200) {
        notifyScreen("success", "Thành công", res.data.message);
        setShowModalUpdate(false);
        return setStatusUpdate(true);
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

  const handleBtnDelete = async (id) => {
    setStatusUpdate(false);
    try {
      let res = await removeCategory(id);
      if (res.data.statusCode === 200) {
        notifyScreen("success", "Thành công", res.data.message);
        return setStatusUpdate(true);
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
    return setTagsUpdate(value);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        tags.map((t,key)=><span key={key}><Tag color="#87d068">{t.name}</Tag></span>)
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (id) => (
        <>
          <Button type="primary" style={{width:"80px"}} onClick={() => handleBtnUpdate(id)}>
            Update
          </Button>
          <Button type="danger" style={{width:"80px"}} onClick={() => handleBtnDelete(id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    _getListCategory();
    _getListTag();
  }, [statusUpdate]);

  return (
    <div style={{ width: "100%" }}>
      <Row span={24}>
        <Col>
          <Button type="primary" onClick={handleBtnAdd}>
            Add Category
          </Button>
        </Col>
      </Row>
      <Modal
        visible={showModalUpdate}
        onCancel={() => setShowModalUpdate(false)}
        title="Update Category"
        okText="Update"
        onOk={handleBtnUpdateInModal}
      >
        <Row>
          <div>
            <span>*</span> Name
          </div>
          <Input
            placeholder="Nhập tên"
            onChange={(e) => setNameUpdateCategory(e.target.value)}
          />
        </Row>
        <Row>
          <div>
            <span>*</span> Tag
          </div>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn"
            onChange={handleChangeTagInput}
          >
            {tags.map((t, key) => (
              <Select.Option key={key} label={t.name} value={t._id}>
                {t.name}
              </Select.Option>
            ))}
          </Select>
        </Row>
      </Modal>
      <Modal
        visible={showModalAdd}
        onCancel={() => setShowModalAdd(false)}
        okText="Add"
        onOk={handleBtnAddInModal}
        title="Add Category"
      >
        <div>
            <span>*</span> Name
        </div>
        <Input
          placeholder="Nhập tên"
          onChange={(e) => setNameUpdateCategory(e.target.value)}
        />
        <Row>
          <div>
            <span>*</span> Tag
          </div>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn"
            onChange={handleChangeTagInput}
          >
            {tags.map((t, key) => (
              <Select.Option key={key} label={t.name} value={t._id}>
                {t.name}
              </Select.Option>
            ))}
          </Select>
        </Row>
      </Modal>
      <Table columns={columns} dataSource={categories} pagination={false} />
    </div>
  );
};

export default CategoryAdmin;
