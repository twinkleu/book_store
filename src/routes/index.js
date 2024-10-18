import userRouter from "../modules/user/userRoutes.js";
import booksRouter from "../modules/books/bookRouter.js";
import cartRouter from "../modules/cart/cartRoutes.js";
import orderRouter from "../modules/order/orderRoute.js";

export const router = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/books", booksRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/orders", orderRouter);
};
