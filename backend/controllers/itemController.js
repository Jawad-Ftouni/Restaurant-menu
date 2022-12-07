import { Item } from "../models/Item.js";
import { Category } from "../models/Category.js";

export const createItem = async (req, res) => {
  try {
    const category1 = await Category.findById(req.body.category_id);
    const categoryName = category1.name;
    console.log(categoryName);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      category_id: req.body.category_id,
      categoryName: categoryName,
    });

    const result = await item.save();
    const category = await Category.findById(item.category_id);
    category.items.push(item);
    const added = await category.save();
    if (!added) console.log("items not added to category yet");
    res.send("success");
  } catch (e) {
    console.error(e.message);
  }
};

export const getItems = async (req, res) => {
  const item = await Item.find();
  if (!item) res.status(404).send("no items found");
  res.send(item);
};

export const deleteItems = async (req, res) => {
  const result = await Item.deleteMany();
  console.log(result);
  if (!result) res.send("cant delete");
  res.send(result);
};

export const editItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    // console.log(req.body);
    item.name = req.body.name ?? item.name;
    item.price = req.body.price ?? item.price;
    item.image = req.body.image ?? item.image;
    item.category_id = req.body.category_id ?? item.category_id;

    await item.save();
    res.send("updated");
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) res.status(404).send("cant delete item");
    res.send("item deleted");
  } catch (e) {
    console.error(e.message);
  }
};

export const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) res.status(404).send("item not found");
    console.log(item);
    res.send(item);
  } catch (e) {
    console.error(e.message);
  }
};
