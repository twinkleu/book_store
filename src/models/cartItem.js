import mongoose from "mongoose"
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);
export default mongoose.model("CartItem", cartItemSchema);