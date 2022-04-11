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
db.WishBook = require("./wishBook")(sequelize, DataTypes);
db.BookComment = require("./bookComment")(sequelize, DataTypes);
db.BookReview = require("./bookReview")(sequelize, DataTypes);

//source key는 왼쪽 db값의 값, target key는 오른쪽의 db값의 값
db.User.hasMany(db.WishBook, {
  foreignKey: "userId",
  sourceKey: "id", //왼쪽(user) db의 id값
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.WishBook.belongsTo(db.User, {
  foreignKey: "userId",
  targetKey: "id",
});

db.WishBook.hasMany(db.BookReview, {
  foreignKey: "bookId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.BookReview.belongsTo(db.WishBook, {
  foreignKey: "bookId",
  targetKey: "id",
});

db.WishBook.hasMany(db.BookComment, {
  foreignKey: "bookId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.BookComment.belongsTo(db.WishBook, {
  foreignKey: "bookId",
  targetKey: "id",
});

db.Op = Op;

module.exports = db;
