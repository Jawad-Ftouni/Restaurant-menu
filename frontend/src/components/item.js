import image1 from "../images/chicken_cheese_burger-1.jpg";
const item = ({ name, description, price, image }) => {
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      {console.log(image1)}
      <h1> {name} </h1>
      <p> ${price} </p>
      <p>{description}</p>
    </div>
  );
};

export default item;
