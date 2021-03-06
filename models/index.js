"use strict";

const { Sequelize, Op } = require("sequelize");
const config = require("../config");
const User = require("./user");
const Category = require("./category");
const UserBookList = require("./userBookList");
const BookParagraph = require("./bookParagraph");
const BookReviewLike = require("./bookReviewLike");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize; // app에서 sync해주기 위해서
db.User = User;
db.Category = Category;
db.UserBookList = UserBookList;
db.BookParagraph = BookParagraph;
db.BookReviewLike = BookReviewLike;

User.init(sequelize);
Category.init(sequelize);
UserBookList.init(sequelize);
BookParagraph.init(sequelize);
BookReviewLike.init(sequelize);

User.associate(db);
UserBookList.associate(db);
BookParagraph.associate(db);
BookReviewLike.associate(db);

db.Op = Op;

module.exports = db;
