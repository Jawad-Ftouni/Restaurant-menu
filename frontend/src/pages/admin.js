import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../styles/table.css";
import "../styles/Login.css";

const Admin = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3400/api/menu/items").then((res) => {
      setItems(res.data);
    });
  }, []);

  const handleDeleteClick = (itemId) => {
    axios.delete(`http://localhost:3400/api/menu/items/${itemId}`).then(() => {
      console.log("item deleted");
    });
  };

  return (
    <div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">description</th>
            <th scope="col">price</th>
            <th scope="col">category</th>
            <th scope="col">update</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, key) => (
            <tr key={key}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}$</td>
              <td>{item.categoryName}</td>
              <td>
                <button
                  key={key}
                  onClick={() => {
                    navigate(`/admin/updateItem/${item._id}`);
                  }}
                >
                  update
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    handleDeleteClick(item._id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="center">
        <button
          onClick={() => {
            navigate("/admin/createItem");
          }}
          className="btn btn-info"
        >
          Create item
        </button>
        <button
          onClick={() => {
            navigate("/admin/createCategory");
          }}
          className="btn btn-info"
        >
          Manage categories
        </button>
      </div>
    </div>
  );
};
export default Admin;
