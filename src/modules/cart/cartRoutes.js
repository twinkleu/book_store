import express from "express";
import { addToCart, getCart, removeFromCart } from "./cartController.js";
import checkAuth from "../../middleware/checkAuth.js";

const router = express.Router();

router.post("", checkAuth, addToCart);
router.get("", checkAuth, getCart);
router.delete("/:itemId", checkAuth, removeFromCart);

export default router;
