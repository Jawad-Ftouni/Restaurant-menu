import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpdateCategory() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3400/api/menu/categories/${id}`).then((e) => {
      setData(e);
      console.log(e.data);
    });
  }, []);

  const setData = (e) => {
    setName(e.data.name);
    setIcon(e.data.icon);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3400/api/menu/categories/${id}`, {
        name: name,
        icon: icon,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/Admin/createCategory");
  };
  const fileBrowseHandler = (event) => {
    let value = URL.createObjectURL(event.target.files[0]);
    setIcon(value);
  };

  return (
    <div className="center1">
      <form onSubmit={handleEditFormSubmit} className="form-group">
        Category name:
        <input
          type="text"
          value={name}
          placeholder="update name of category"
          required
          className="form-control"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        Category icon:
        <input
          type="file"
          id="image"
          className="form-control"
          value={icon}
          onChange={(e) => fileBrowseHandler(e)}
        />
        <div className="center">
          <button type="submit" className="btn btn-success">
            update
          </button>
          <button
            onClick={() => {
              navigate("/Admin/updateCategory");
            }}
            className="btn btn-warning"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}
