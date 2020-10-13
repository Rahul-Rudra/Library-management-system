const express = require("express");
const mongoose = require("mongoose");
const db = require("../models/Issue");
const Book = require("../models/Book");
const User = require("../models/User");
const Activity = require("../models/Activity");

const getIssueBook = async (req, res) => {
  try {
    const result = await db.find();
    res.json(result);
  } catch (error) {
    res.status(404).json("No details of Issued book");
  }
};

const issueBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.book_id);
    const user = await User.findById(req.params.user_id);
    const st = book.stock;
    if (user.bookIssueInfo.length >= 5) {
      const len = user.bookIssueInfo.length;
      return res.json({ msg: "cannot access more than 5 books", len });
    }
    //console.log(st);
    //console.log(st === 0);
    if (st === 0) {
      return res.json({
        message: "You can not acccess this book because stock is 0",
        st,
      });
    } else {
      book.stock -= 1;
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
      res.json(issue);
    }
  } catch (err) {
    res.json("error");
  }
};

const returnBook = async (req, res, next) => {
  try {
    const book_id = req.params.book_id;
    // console.log(book_id);
    // const name=req.user.name
    const user = await User.findById(req.params.id);
    const pos = user.bookIssueInfo.indexOf(req.params.book_id);
    //console.log(pos);
    //console.log(pos);
    //console.log(pos);

    const book = await Book.findById(book_id);
    book.stock += 1;
    await book.save();

    const issue = await db.findOne({ "user_id.id": req.params.id });

    console.log(issue.book_info.id);
    const c = issue.book_info.id;
    //console.log(c != book_id);
    if (issue === null || c != book_id) {
      return res.json({
        msg: "Not issued by you first issue then return",
        issue,
      });
    }
    await issue.remove();

    const result = user.bookIssueInfo.splice(pos, 1);
    // console.log(result);
    await user.save();

    const activity = new Activity({
      info: {
        id: issue.book_info.id,
        title: issue.book_info.title,
      },
      category: "Return",
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
    await activity.save();
    res.json("successfull");
    next();
  } catch (err) {
    res.status(400).json({ msg: "you do not issued this book" });
    //console.log(err);
    //return res.redirect("back");
  }
};

const renewBook = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.user_id);
    //console.log(user);
    const searchObj = {
      "user_id.id": user._id,
      "book_info.id": req.params.id,
    };
    const issue = await db.findOne(searchObj);
    //console.log(issue);
    //const c = issue.book_info.id;
    if (issue === null) {
      return res.json({
        msg: "Not issued by you first issue then renew",
        issue,
      });
    }
    console.log(issue);

    let time = issue.book_info.returnDate.getTime();
    issue.book_info.returnDate = time + 7 * 24 * 60 * 60 * 1000;
    issue.book_info.isRenewed = true;

    const activity = new Activity({
      info: {
        id: issue._id,
        title: issue.book_info.title,
      },
      category: "Renew",
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

    await activity.save();
    await issue.save();
    res.json("done");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  issueBook,
  returnBook,
  renewBook,
  getIssueBook,
};
