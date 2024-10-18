import express from "express";
import { addBook, getAllBooks, getBookById } from "./bookController.js";

const router = express.Router();

router.post("", addBook);
router.get("", getAllBooks);
router.get("/:id", getBookById);

export default router;
