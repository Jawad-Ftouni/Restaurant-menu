import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateItem = () => {
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3400/api/menu/items/${id}`).then((e) => {
      setData(e);
    });

    axios.get("http://localhost:3400/api/menu/categories").then((e) => {
      setCategories(e.data);
    });
  }, []);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const navigate = useNavigate();

  const setData = (e) => {
    setName(e.data.name);
    setDescription(e.data.description);
    setPrice(e.data.price);
    setImage(e.data.image);
    setCategory_id(e.data.category_id);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3400/api/menu/items/${id}`, {
        name: name,
        description: description,
        price: price,
        image: image,
        category_id: category_id,
      })

      .then((e) => {
        console.log("item updated");
      });
    navigate("/Admin");
  };
  const handleCategoryChange = ({ target }) => {
    console.log(target.value);
    setCategory_id(target.value);
  };
  const fileBrowseHandler = (event) => {
    let value = URL.createObjectURL(event.target.files[0]);
    setImage(value);
  };
  return (
    <div className="form-group">
      <form onSubmit={handleEditFormSubmit}>
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
          name="image"
          className="form-control"
          alt=""
          required
          onChange={(e) => {
            fileBrowseHandler(e);
          }}
        />
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => handleCategoryChange(e)}
          value={category_id}
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
            Update
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

export default UpdateItem;
