import express from "express";
import {
  placeOrder,
  getOrderHistory,
  getOrderDetails,
} from "./orderController.js";
import checkAuth from "../../middleware/checkAuth.js";

const router = express.Router();

router.post("", checkAuth, placeOrder);
router.get("", checkAuth, getOrderHistory);
router.get("/:id", checkAuth, getOrderDetails);

export default router;
