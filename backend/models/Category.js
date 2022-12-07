import mongoose from "mongoose";
const Schema = mongoose.Schema;

const caregorySchema = new Schema({
  name: {
    type: String,
  },

  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: false,
    },
  ],
  icon: String,
});
export const Category = mongoose.model("Category", caregorySchema);
