import Cart from "../../models/cart.js";
import CartItem from "../../models/cartItem.js";
import Book from "../../models/books.js";

export const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.id;

    if (!bookId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Book and quantity are required" });
    }

    const book = await Book.findOne({ _id: bookId });
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId });
    }

    const cartItem = await CartItem.create({
      cartId: cart._id,
      book: bookId,
      quantity,
    });

    cart.items.push(cartItem._id);
    await cart.save();

    return res
      .status(200)
      .json({ success: true, message: "Book added to cart", data: cart });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error adding book to cart" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.id;

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "book",
        model: "Book",
      },
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Cart details fetched successfully",
      data: cart,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching cart details" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const cartItem = await CartItem.findOne({ _id: itemId, cartId: cart._id });
    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found in your cart" });
    }

    cart.items.pull(cartItem._id);
    await cart.save();

    await CartItem.deleteOne({ _id: itemId });

    return res
      .status(200)
      .json({ success: true, message: "Book removed from cart", data: cart });
  } catch (error) {
    console.log("errorrrr", error);
    return res
      .status(500)
      .json({ success: false, message: "Error removing book from cart" });
  }
};
