const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator/check");
const Admin = require("../middleware/Admin");
const verifyToken = require("../middleware/authenticate");
const Issue = require("../models/Issue");
const Book = require("../models/Book");
const User = require("../models/User");
const Activity = require("../models/Activity");
const db = require("../models/Message");

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const result = await db.find();
    res.json(result);
  } catch (error) {
    res.status(404).json("No details");
  }
});

router.delete("/:id", async (req, res) => {
  const result = await db.findByIdAndRemove(req.params.id);
  res.json({ message: "Successfully deleted" });
});

router.post("/book_id/:book_id/user_id/:user_id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.book_id);
    const user = await User.findById(req.params.user_id);

    const st = book.stock;
    if (user.bookIssueInfo.length >= 5) {
      const len = user.bookIssueInfo.length;
      return res
        .send(200)
        .json({ msg: "cannot access more than 5 books", len });
    }
    //console.log(st);
    //console.log(st === 0);
    else if (st === 0) {
      return res.send(200).json({
        msg: "You can not acccess this book because stock is 0",
        st,
      });
    } else {
      text = "user has requested for a book";
      // console.log(text);
      const message = new db({
        text,
        book_info: {
          id: book._id,
          title: book.title,
          ISBN: book.ISBN,
        },
        user_id: {
          id: user._id,
          name: user.name,
        },
      });

      await message.save();
      res.json(message);
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
/*   book.stock -= 1;
      const issue = new db({
        book_info: {
          id: book._id,
          title: book.title,
          ISBN: book.ISBN,
          stock: book.stock,
          author: book.author,
        },
        user_id: {
          id: user._id,
          name: user.name,
        },
      });

      user.bookIssueInfo.push(book._id);
      //  const d = issue.book_info.issueDate.split("T");
      //const d1 = issue.book_info.returnDate.split("T");
      //console.log(d[0]);

      const activity = new Activity({
        info: {
          id: book._id,
          title: book.title,
        },
        category: "Issue",
        time: {
          id: issue._id,
          issueDate: issue.book_info.issueDate,
          returnDate: issue.book_info.returnDate,
        },
        user_id: {
          id: user._id,
          name: user.name,
        },
      });

      await user.save();
      await issue.save();
      await activity.save();
      await book.save();
      res.json({ issue: issue, user: user });
    }
  }*/ // catch (err) {
//res.json("error");
///
