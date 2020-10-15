const db = require("../models/Book");
const { body, validationResult } = require("express-validator");
const Book = require("../models/Book");

const getBook = async (req, res) => {
  try {
    const result = await db.find();
    res.json(result);
  } catch (error) {
    res.status(500);
  }
};

const getSortedBook = (req, res) => {
  res.json(res.paginatedResults);
  //res.json(result);
};
const getsearchBook = (req, res) => {
  const searchField = req.query.title;
  Book.find({ title: { $regex: searchField, $options: "$i" } }).then((data) => {
    res.json(data);
  });
};
const postBook =
  ([
    body("title").isString().isLength({ max: 10 }).notEmpty(),
    body("ISBN").isString().isLength({ min: 6 }),
    body("stock").isNumeric(),
    body("author").isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const book = new db({
        title: req.body.title,
        ISBN: req.body.ISBN,
        stock: req.body.stock,
        author: req.body.author,
      });
      await book.save();
      res.json(book);
    } catch (error) {
      res.status(500).json("server error");
    }
  });

const deleteBook = async (req, res) => {
  const result = await db.findByIdAndRemove(req.params.id);
  res.json({ message: "Successfully deleted book" });
};

module.exports = {
  getBook,
  postBook,
  getSortedBook,
  deleteBook,
  getsearchBook,
};
