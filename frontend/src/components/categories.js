import React from "react";
import Items from "./item";

function Category({ category, id }) {
  return (
    <div>
      <div className="headitem">
        <div className="split">
          <h1>{category.name}</h1>

          <img src={category.icon} alt="" className="ico" />
        </div>
      </div>
      <div className="row">
        {category.items.map((item, key) => {
          return (
            <div className="columns" key={key} id={id}>
              <Items
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
