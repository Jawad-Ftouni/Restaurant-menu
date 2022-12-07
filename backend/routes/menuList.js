import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategories,
  editCategory,
  getCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import {
  createItem,
  getItems,
  deleteItems,
  getItem,
  editItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();
router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
router.get("/items", getItems);
router.get("/items/:id", getItem);

router.post("/items", createItem);
router.post("/categories", createCategory);

router.delete("/items", deleteItems);
router.delete("/categories", deleteCategories);
router.delete("/items/:id", deleteItem);
router.delete("/categories/:id", deleteCategory);

router.put("/categories/:id", editCategory);
router.put("/items/:id", editItem);

export default router;
