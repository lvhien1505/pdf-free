import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table,Modal,Input } from "antd";
import { getAllTag,createTag,updateTag,removeTag } from "../../api/tag";
import { notifyScreen } from "../../utils/notify";


const TagAdmin = () => {
  const [nameUpdateTag, setNameUpdateTag] = useState("");
  const [idTag, setIdTag] = useState("");
  const [tags, setTags] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(false);

  const _getListTag= async () => {
    try {
      let res = await getAllTag();
      if (res.status === 200) {
        setTags(res.data)
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
  const handleBtnAdd =()=>{
    return setShowModalAdd(true)
  }

  const handleBtnAddInModal =async () =>{
       setStatusUpdate(false)
        try {
            let res= await createTag(nameUpdateTag)
            if (res.data.statusCode ===200) {
              notifyScreen("success","Thành công",res.data.message);
              setShowModalAdd(false)
              return setStatusUpdate(true)
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
  }

  const handleBtnUpdate=(id)=>{
    setIdTag(id)
    setShowModalUpdate(true)
    return;

  }

  const handleBtnUpdateInModal=async ()=>{
    setStatusUpdate(false)
    let name = nameUpdateTag 
        try {
            let res= await updateTag(idTag,name)
            if (res.data.statusCode ===200) {
              notifyScreen("success","Thành công",res.data.message);
              setShowModalUpdate(false)
              return setStatusUpdate(true)
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
  }

  const handleBtnDelete=async (id)=>{
    setStatusUpdate(false)
    try {
      let res= await removeTag(id)
      if (res.data.statusCode ===200) {
        notifyScreen("success","Thành công",res.data.message);
        return setStatusUpdate(true)
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
  }

  const columns=[
    {
      title:"Name",
      dataIndex:"name",
      key:"name",
    },
    {
      title:"Action",
      dataIndex:"_id",
      key:"action",
      render:(id)=> (
        <>
          <Button type="primary" onClick={()=>handleBtnUpdate(id)}>Update</Button>
          <Button type="danger"  onClick={()=>handleBtnDelete(id)}>Delete</Button>
        </>
      )
    }
  ]

  useEffect(() => {
    _getListTag();
  }, [statusUpdate]);

  return (
    <div style={{width:"100%"}}>
      <Row span={24}>
          <Col>
            <Button type="primary" onClick={handleBtnAdd}>Add Tag</Button>
          </Col>
      </Row>
      <Modal visible={showModalUpdate} onCancel={()=>setShowModalUpdate(false)} title="Update Tag" okText="Update" onOk={handleBtnUpdateInModal}>
          <Input placeholder="Nhập tên" onChange={(e)=>setNameUpdateTag(e.target.value)}/>
      </Modal>
      <Modal visible={showModalAdd} onCancel={()=>setShowModalAdd(false)} okText="Add" onOk={handleBtnAddInModal} title="Add Tag">
          <Input  placeholder="Nhập tên" onChange={(e)=>setNameUpdateTag(e.target.value)} />
      </Modal>
      <Table columns={columns} dataSource={tags} pagination={false}/>
    </div>
  );
};

export default TagAdmin;
