import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const CreateItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3400/api/menu/categories").then((e) => {
      setCategories(e.data);
    });
  }, []);

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    console.log(image);
    axios
      .post("http://localhost:3400/api/menu/items", {
        name: name,
        description: description,
        price: price,
        image: image,
        category_id: category_id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/Admin");
  };
  const handleCategoryChange = ({ target }) => {
    setCategory_id(target.value);
  };

  const fileBrowseHandler = (event) => {
    let value = URL.createObjectURL(event.target.files[0]);
    setImage(value);
  };

  return (
    <div>
      <form onSubmit={handleAddFormSubmit} encType="multipart/form-data">
        Item name:
        <input
          type="text"
          name="name"
          required
          // placeholder={item.name}
          className="form-control"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        description:
        <input
          type="text"
          name="description"
          required
          className="form-control"
          // placeholder={item.description}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        price:
        <input
          type="number"
          name="price"
          required
          className="form-control"
          // placeholder={item.price}
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        image:
        <input
          type="file"
          id="image"
          required
          className="form-control"
          // onChange={ e => setFiles(e.target.value)}
          onChange={(e) => fileBrowseHandler(e)}
        />
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => handleCategoryChange(e)}
        >
          <option value=" Select a category "> -- Select a category -- </option>

          {categories.map((category, key) => (
            <option value={category._id} key={key}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="center">
          <button type="submit" className="btn btn-success">
            Create
          </button>
          <button
            onClick={() => {
              navigate("/Admin");
            }}
            className="btn btn-warning"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
