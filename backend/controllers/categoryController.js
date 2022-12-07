import { Item } from "../models/Item.js";
import { Category } from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    //    const item = Item.findById(req.body.items._id);
    // if(!item)res.send("no items found");
    const category = new Category({
      name: req.body.name,
      icon: req.body.icon,
    });

    const result = await category.save();
    if (!result) return res.send("category not added");
    //  console.log(category.name);//<---------
    res.send(category);
  } catch (e) {
    console.error(e.message);
  }
};

export const getCategories = async (req, res) => {
  const category = await Category.find().populate("items");

  if (!category) res.status(404).send("no category found");
  // console.log(Books);
  res.send(category);
};

export const deleteCategories = async (req, res) => {
  const result = await Category.deleteMany();
  console.log(result);
  if (!result) res.send("cant delete");
  res.send(result);
};

export const editCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    console.log(req.body);
    category.name = req.body.name ?? category.name;
    category.items = req.body.items ?? category.items;
    category.icon = req.body.icon ?? category.icon;
    await category.save();
    res.send("updated");
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) res.status(404).send("cant delete category");
  res.send("category deleted");
};
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) res.status(404).send("item not ");
    res.send(category);
  } catch (e) {
    console.log(e.message);
  }
};
