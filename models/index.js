"use strict";

const { Sequelize, DataTypes, Op } = require("sequelize");
const config = require("../config");
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize; // app에서 sync해주기 위해서
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, DataTypes);
db.Category = require("./category")(sequelize, DataTypes);
db.UserBookList = require("./userBookList")(sequelize, DataTypes);
db.BookParagraph = require("./bookParagraph")(sequelize, DataTypes);
db.BookReviewLike = require("./bookReviewLike")(sequelize, DataTypes);

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

db.UserBookList.hasMany(db.BookReviewLike, {
  foreignKey: "userBookListId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.BookReviewLike.belongsTo(db.UserBookList, {
  foreignKey: "userBookListId",
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

db.Op = Op;
db.sequelize = sequelize;

module.exports = db;
