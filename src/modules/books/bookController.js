import Book from "../../models/books.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, price, description, stock } = req.body;

    if (!title || !author || !price || !description || !stock) {
      return res
        .status(400)
        .json({ success: false, message: "All book details are required" });
    }

    const newBook = await Book.create({
      title,
      author,
      price,
      description,
      stock,
    });

    if (!newBook) {
      return res
        .status(500)
        .json({ success: false, message: "Error while adding the book" });
    }

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newBook,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while adding the book" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) {
      return res
        .status(200)
        .json({ success: true, message: "No Books Found", data: books });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Books fetched successfully",
        data: books,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching books" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const book = await Book.findOne({ _id: id });

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching book details" });
  }
};
