import Order from "../../models/order.js";
import OrderItem from "../../models/orderItem.js";
import Cart from "../../models/cart.js";
import CartItem from "../../models/cartItem.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.id;

    const cart = await Cart.findOne({ user: userId }).populate("items");
    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Your cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const cartItem = await CartItem.findById(item).populate("book");
      if (!cartItem) {
        return res
          .status(404)
          .json({ success: false, message: "Cart item not found" });
      }

      const book = cartItem.book;
      totalAmount += book.price * cartItem.quantity;

      orderItems.push({
        book: book._id,
        quantity: cartItem.quantity,
      });
    }

    const newOrder = await Order.create({
      user: userId,
      totalAmount,
      status: "completed",
    });

    const createdOrderItems = await OrderItem.insertMany(
      orderItems.map((item) => ({
        ...item,
        orderId: newOrder._id,
      }))
    );

    newOrder.items = createdOrderItems.map((item) => item._id);
    await newOrder.save();

    await CartItem.deleteMany({ cartId: cart._id });
    cart.items = [];
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error placing order", error });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.id;
    const orders = await Order.find({ user: userId }).populate({
      path: "items",
      populate: { path: "book" },
    });

    return res.status(200).json({
      success: true,
      message: "Order history fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error, "errrrorrr");
    return res
      .status(500)
      .json({ success: false, message: "Error fetching order history", error });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const userId = req.id;
    const { id } = req.params;

    const order = await Order.findOne({ _id: id, user: userId }).populate({
      path: "items",
      populate: { path: "book" },
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: order,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching order details", error });
  }
};
