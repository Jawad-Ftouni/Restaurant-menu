import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";

export default function CreateCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3400/api/menu/categories").then((e) => {
      setCategories(e.data);
    });
  }, []);

  const handleDeleteClick = (categoryId) => {
    axios
      .delete(`http://localhost:3400/api/menu/categories/${categoryId}`)
      .then((res) => {
        if (res.ok()) console.log("category deleted");
      });
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3400/api/menu/categories", {
        name: name,
        icon: icon,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const fileBrowseHandler = (event) => {
    let value = URL.createObjectURL(event.target.files[0]);
    setIcon(value);
  };
  return (
    <div className="center1">
      <div>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">update</th>
              <th scope="col">delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, key) => (
              <tr key={key}>
                <td>{category.name}</td>
                <td>
                  <button
                    onClick={() => {
                      navigate(`/admin/updateCategory/${category._id}`);
                    }}
                  >
                    update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDeleteClick(category._id);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <form onSubmit={handleAddFormSubmit} className="form-group">
          Category name:
          <input
            type="text"
            value={name}
            required
            className="form-control"
            placeholder="enter name of category"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          Category icon:
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={(e) => fileBrowseHandler(e)}
          />
          <div className="center">
            <button type="submit" className="btn btn-primary">
              create
            </button>
            <button
              onClick={() => {
                navigate("/Admin");
              }}
              className="btn btn-warning "
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
