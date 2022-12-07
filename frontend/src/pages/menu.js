import React from "react";
import { useState, useNavigate, useEffect } from "react";
import axios from "axios";
import Categories from "../components/categories";
import "../styles/Menu.css";
import "../styles/Login.css";

function Menu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3400/api/menu/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const scrollIntoElement = (id) => {
    console.log(id.target.value);
    const element = document.getElementById(id.target.value);
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  return (
    <>
      <div className="menu">
        <h1 className="menuTitle">Our Menu</h1>
        <select
          onChange={(e) => {
            scrollIntoElement(e);
          }}
          className="form-select"
          aria-label="Default select example"
        >
          <option value=" Select a category "> -- Select a category -- </option>

          {categories.map((category, key) => (
            <option value={category._id} key={key}>
              {category.name}
            </option>
            // "#" + category._id
          ))}
        </select>
        <div className="menuList">
          {categories.map((category, key) => {
            return (
              <Categories key={key} category={category} id={category._id} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Menu;
