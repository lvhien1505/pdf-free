import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'
import { Menu } from "antd";
import { getAllCategory } from "../../api/category";
import { notifyScreen } from "../../utils/notify";
import { convertStringNameTag } from "../../utils/convert";

const MenuCategory = () => {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    _getListCategory();
  }, []);

  return (
    <Menu
      style={{
        border: "1px solid #f0f0f0",
        maxWidth: "300px",
        minWidth: "220px",
        marginTop: "74px",
      }}
      mode="inline"
    >
      {categories.map((c) => (
        <Menu.SubMenu key={c._id} title={c.name}>
          {c.tags.map((t) => {
            return <Menu.Item key={t._id}><Link to={`/ebooks/category/${convertStringNameTag(t.name)}`}>{t.name}</Link></Menu.Item>
          })}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
};

export default MenuCategory;
