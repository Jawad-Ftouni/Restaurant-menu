import mongoose from "mongoose";
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },

  image: String,

  category_id: String,
  categoryName: String,
});

export const Item = mongoose.model("Item", itemsSchema);
