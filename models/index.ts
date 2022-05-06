"use strict";

<<<<<<< HEAD:models/index.ts
import { Sequelize, DataTypes, Op } from "sequelize";
import config from "../config";
import user from "./user";
import category from "./category";
import userBookList from "./userBookList";
import bookParagraph from "./bookParagraph";
import bookReview from "./bookReview";
import bookReviewLike from "./bookReviewLike";
=======
const { Sequelize, Op } = require("sequelize");
const config = require("../config");
const User = require("./user");
const Category = require("./category");
const UserBookList = require("./userBookList");
const BookParagraph = require("./bookParagraph");
const BookReviewLike = require("./bookReviewLike");
>>>>>>> 957033c197ed2d82cf1a393d2a79ae6b4fcda445:models/index.js

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize; // app에서 sync해주기 위해서
<<<<<<< HEAD:models/index.ts
db.Sequelize = Sequelize;

db.User = user(sequelize, DataTypes);
db.Category = category(sequelize, DataTypes);
db.UserBookList = userBookList(sequelize, DataTypes);
db.BookParagraph = bookParagraph(sequelize, DataTypes);
db.BookReview = bookReview(sequelize, DataTypes);
db.BookReviewLike = bookReviewLike(sequelize);

//source key는 왼쪽 db값의 값, target key는 오른쪽의 db값의 값
db.User.hasMany(db.UserBookList, {
  foreignKey: "userId",
  sourceKey: "id", //왼쪽(user) db의 id값
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.UserBookList.belongsTo(db.User, {
  foreignKey: "userId",
  targetKey: "id",
});

db.UserBookList.hasMany(db.BookReview, {
  foreignKey: "bookId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.BookReview.belongsTo(db.UserBookList, {
  foreignKey: "bookId",
  targetKey: "id",
});

db.UserBookList.hasMany(db.BookParagraph, {
  foreignKey: "bookId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.BookParagraph.belongsTo(db.UserBookList, {
  foreignKey: "bookId",
  targetKey: "id",
});

db.BookReview.hasMany(db.BookReviewLike, {
  foreignKey: "bookId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.BookReviewLike.belongsTo(db.BookReview, {
  foreignKey: "bookId",
  targetKey: "id",
});

db.User.hasMany(db.BookReviewLike, {
  foreignKey: "userId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.BookReviewLike.belongsTo(db.User, {
  foreignKey: "userId",
  targetKey: "id",
});
=======
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
>>>>>>> 957033c197ed2d82cf1a393d2a79ae6b4fcda445:models/index.js

db.Op = Op;

export default db;
